-- Create Categories Table
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50) DEFAULT '📦',
  color VARCHAR(7) DEFAULT '#d4a5a5',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Products Table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  video TEXT,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies - Allow public read access
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access to products"
ON products FOR SELECT
TO public
USING (true);

-- Create policies - Allow authenticated users to insert/update/delete
-- (Nanti kita akan ganti dengan auth yang lebih proper)
CREATE POLICY "Allow all access to categories for authenticated users"
ON categories
FOR ALL
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all access to products for authenticated users"
ON products
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
('Bunga', 'bunga', 'Berbagai jenis bunga segar dan pot', '🌸', '#d4a5a5'),
('Boneka', 'boneka', 'Boneka lucu untuk hadiah', '🧸', '#c9d5b5'),
('Aksesoris', 'aksesoris', 'Aksesoris dekorasi dan lainnya', '✨', '#d4af37');

-- Create storage bucket for product images
-- (Run this in Supabase Dashboard > Storage > Create Bucket)
-- Bucket name: product-images
-- Public: Yes
