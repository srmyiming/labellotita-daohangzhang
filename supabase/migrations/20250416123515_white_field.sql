/*
  # 更新产品目录 URL

  1. 更新
    - 更新示例制造商的产品目录 URL 为实际可访问的 URL
*/

-- 更新示例数据中的产品目录 URL
UPDATE manufacturers
SET catalog_pdf_url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
WHERE id IN (
  'f1b6c3a2-1234-5678-90ab-cdef12345678',
  'a2b3c4d5-6789-0123-4567-89abcdef0123',
  'b3c4d5e6-7890-1234-5678-9abcdef01234'
);