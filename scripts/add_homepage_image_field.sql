-- Add homepage_image field to products table to separate homepage images from product management images
ALTER TABLE products ADD COLUMN IF NOT EXISTS homepage_image character varying;

-- Update existing products to use current image_name as homepage_image
UPDATE products SET homepage_image = image_name WHERE homepage_image IS NULL;

-- Add comment to explain the fields
COMMENT ON COLUMN products.image_name IS 'Image used in product management section';
COMMENT ON COLUMN products.homepage_image IS 'Image used in homepage "Le Nostre Soluzioni" section';
