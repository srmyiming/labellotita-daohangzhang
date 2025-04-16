/*
  # 更新制造商产品目录 URL

  1. 更新
    - 更新示例制造商的产品目录 URL 为 Google Drive PDF URL
*/

-- 更新示例数据中的产品目录 URL
UPDATE manufacturers
SET catalog_pdf_url = 'https://drive.google.com/file/d/1V2yO8rkQGj83jaZn47H6C0LI8l86R9TT/preview'
WHERE id IN (
  'f1b6c3a2-1234-5678-90ab-cdef12345678',
  'a2b3c4d5-6789-0123-4567-89abcdef0123',
  'b3c4d5e6-7890-1234-5678-9abcdef01234'
);