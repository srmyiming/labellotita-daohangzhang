/*
  # 添加产品目录 PDF 支持
  
  1. 新增字段
    - manufacturers 表:
      - `catalog_pdf_url` (text) - 产品目录 PDF 文件 URL
  
  2. 更新示例数据
    - 为现有制造商添加示例 PDF URL
*/

-- 添加产品目录 PDF URL 字段
ALTER TABLE manufacturers
ADD COLUMN catalog_pdf_url text;

-- 更新示例数据
UPDATE manufacturers
SET catalog_pdf_url = 'https://example.com/catalogs/sample.pdf'
WHERE id IN (
  'f1b6c3a2-1234-5678-90ab-cdef12345678',
  'a2b3c4d5-6789-0123-4567-89abcdef0123',
  'b3c4d5e6-7890-1234-5678-9abcdef01234'
);