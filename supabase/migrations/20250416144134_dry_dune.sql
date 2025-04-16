/*
  # Add manufacturer tags relations

  1. Changes
    - Add tag relations for existing manufacturers
    - Each manufacturer will be assigned relevant tags based on their category and characteristics
  
  2. Data
    - Links manufacturers with appropriate tags from the tags table
    - Creates meaningful tag associations for better searchability
*/

-- Add tag relations for manufacturers
INSERT INTO manufacturer_tags (manufacturer_id, tag_id)
SELECT 
  m.id as manufacturer_id,
  t.id as tag_id
FROM manufacturers m
CROSS JOIN tags t
WHERE 
  -- Match manufacturers with relevant tags based on their characteristics
  (m.verified = true AND t.name = 'ISO9001')
  OR (m.verified = true AND t.name = 'HACCP')
  OR (EXISTS (
    SELECT 1 FROM manufacturer_category_relations mcr
    WHERE mcr.manufacturer_id = m.id
    AND mcr.category_id IN (
      SELECT id FROM manufacturer_categories 
      WHERE name LIKE '%乳制品%'
    )
  ) AND t.name = '有机认证')
  OR (m.rating >= 4.5 AND t.name = '手工制作')
  OR (EXISTS (
    SELECT 1 FROM manufacturer_category_relations mcr
    WHERE mcr.manufacturer_id = m.id
    AND mcr.category_id IN (
      SELECT id FROM manufacturer_categories 
      WHERE name LIKE '%橄榄油%'
    )
  ) AND t.name = '环保包装')
  OR (m.recommended = true AND t.name = '欧盟认证')
ON CONFLICT ON CONSTRAINT manufacturer_tags_pkey DO NOTHING;