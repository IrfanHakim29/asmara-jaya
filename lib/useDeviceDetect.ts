"use client";

import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Check for mobile devices
      const mobileRegex = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || width < 768;
      
      // Check for tablets
      const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;
      const isTabletDevice = tabletRegex.test(userAgent) || (width >= 768 && width < 1024);
      
      setIsMobile(isMobileDevice);
      setIsTablet(isTabletDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  };
}
