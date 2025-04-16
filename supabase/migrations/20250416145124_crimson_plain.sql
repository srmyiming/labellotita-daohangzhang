/*
  # 添加制造商认证数据

  1. 添加认证信息
    - 为每个制造商添加相关认证
    - 包含认证名称、发证日期和过期日期
    
  2. 数据说明
    - 每个制造商至少有2-3个认证
    - 认证包括 ISO、HACCP、有机认证等
*/

-- 添加 Embutidos Garcia 的认证
INSERT INTO manufacturer_certifications 
  (manufacturer_id, name, issue_date, expiry_date)
VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'ISO 9001:2015', '2023-01-15', '2026-01-14'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'HACCP', '2023-03-20', '2025-03-19'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', '欧盟有机认证', '2023-06-01', '2024-05-31');

-- 添加 Quesos La Mancha 的认证
INSERT INTO manufacturer_certifications 
  (manufacturer_id, name, issue_date, expiry_date)
VALUES
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'ISO 22000:2018', '2023-05-10', '2026-05-09'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'HACCP', '2023-07-15', '2025-07-14'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', '清真认证', '2023-08-01', '2024-07-31'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', '欧盟有机认证', '2023-09-01', '2024-08-31');

-- 添加 Aceites del Sur 的认证
INSERT INTO manufacturer_certifications 
  (manufacturer_id, name, issue_date, expiry_date)
VALUES
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'ISO 9001:2015', '2023-04-01', '2026-03-31'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'HACCP', '2023-06-15', '2025-06-14'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', '有机认证', '2023-07-01', '2024-06-30'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'FDA认证', '2023-08-15', '2024-08-14');