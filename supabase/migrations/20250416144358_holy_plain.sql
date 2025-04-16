/*
  # Add tags for Quesos La Mancha

  1. Changes
    - Add relevant tags for Quesos La Mancha manufacturer
    - Tags include certifications and product characteristics
*/

-- Add tags for Quesos La Mancha
INSERT INTO manufacturer_tags (manufacturer_id, tag_id)
SELECT 
  'a2b3c4d5-6789-0123-4567-89abcdef0123' as manufacturer_id,
  t.id as tag_id
FROM tags t
WHERE t.name IN (
  '有机认证',
  'ISO9001',
  'HACCP',
  '欧盟认证',
  '手工制作',
  '无麸质',
  '高蛋白'
)
ON CONFLICT ON CONSTRAINT manufacturer_tags_pkey DO NOTHING;