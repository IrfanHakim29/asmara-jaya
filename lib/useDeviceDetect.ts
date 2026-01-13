"use client";

import { useState, useEffect } from "react";

function getDeviceType() {
  if (typeof window === "undefined") {
    // SSR: assume desktop to prevent hydration mismatch
    return { isMobile: false, isTablet: false };
  }

  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for mobile devices
  const mobileRegex = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
  const isMobileDevice = mobileRegex.test(userAgent) || width < 768;
  
  // Check for tablets
  const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;
  const isTabletDevice = tabletRegex.test(userAgent) || (width >= 768 && width < 1024);
  
  return {
    isMobile: isMobileDevice,
    isTablet: isTabletDevice,
  };
}

export function useDeviceDetect() {
  // Initialize with current device type to prevent hydration mismatch
  const [deviceType, setDeviceType] = useState(getDeviceType);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after first render
    setIsHydrated(true);
    
    // Debounce resize handler to prevent flickering
    let resizeTimer: NodeJS.Timeout;
    const checkDevice = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setDeviceType(getDeviceType());
      }, 150); // 150ms debounce
    };

    // Check immediately after mount
    setDeviceType(getDeviceType());
    
    window.addEventListener("resize", checkDevice);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    isMobile: deviceType.isMobile,
    isTablet: deviceType.isTablet,
    isDesktop: !deviceType.isMobile && !deviceType.isTablet,
    isHydrated, // Export hydration state
  };
}
