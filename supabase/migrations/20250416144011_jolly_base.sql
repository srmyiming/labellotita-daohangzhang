/*
  # Add tags tables

  1. New Tables
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `manufacturer_tags`
      - `manufacturer_id` (uuid, references manufacturers)
      - `tag_id` (uuid, references tags)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create manufacturer_tags table
CREATE TABLE IF NOT EXISTS manufacturer_tags (
  manufacturer_id uuid NOT NULL REFERENCES manufacturers(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (manufacturer_id, tag_id)
);

-- Enable RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_tags ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public read access to tags"
  ON tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to manufacturer tags"
  ON manufacturer_tags
  FOR SELECT
  TO public
  USING (true);

-- Create index for better query performance
CREATE INDEX idx_manufacturer_tags_manufacturer_id ON manufacturer_tags(manufacturer_id);
CREATE INDEX idx_manufacturer_tags_tag_id ON manufacturer_tags(tag_id);

-- Add some initial tags
INSERT INTO tags (name) VALUES
  ('有机认证'),
  ('清真认证'),
  ('欧盟认证'),
  ('ISO9001'),
  ('HACCP'),
  ('FDA认证'),
  ('素食'),
  ('无麸质'),
  ('无糖'),
  ('低脂'),
  ('高蛋白'),
  ('非转基因'),
  ('可持续发展'),
  ('环保包装'),
  ('手工制作')
ON CONFLICT (name) DO NOTHING;