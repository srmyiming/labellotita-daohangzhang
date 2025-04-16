/*
  # 添加示例制造商数据

  1. 插入数据
    - 制造商分类
    - 制造商基本信息
    - 制造商图片
    - 制造商与分类关系
    - 制造商产品
    - 制造商认证
    - 制造商出口国家

  2. 数据说明
    - 包含3个示例制造商
    - 每个制造商包含完整的关联数据
    - 使用真实的西班牙食品制造商场景
*/

-- 插入制造商分类
INSERT INTO manufacturer_categories (id, name, icon) VALUES
  ('c1b6c3a2-1234-5678-90ab-cdef12345678', '香肠', 'beef'),
  ('c2b6c3a2-1234-5678-90ab-cdef12345678', '奶酪', 'cookie'),
  ('c3b6c3a2-1234-5678-90ab-cdef12345678', '橄榄油', 'droplet'),
  ('c4b6c3a2-1234-5678-90ab-cdef12345678', '罐头食品', 'box'),
  ('c5b6c3a2-1234-5678-90ab-cdef12345678', '葡萄酒', 'wine'),
  ('c6b6c3a2-1234-5678-90ab-cdef12345678', '面包', 'cookie'),
  ('c7b6c3a2-1234-5678-90ab-cdef12345678', '甜点', 'cake'),
  ('c8b6c3a2-1234-5678-90ab-cdef12345678', '乳制品', 'milk');

-- 插入示例制造商
INSERT INTO manufacturers 
  (id, name, description, address, city, region, phone, email, website, verified, 
   founded_year, employee_count, annual_production, daily_production, storage_capacity, production_lines)
VALUES
  (
    'f1b6c3a2-1234-5678-90ab-cdef12345678',
    'Embutidos Garcia',
    '专业生产伊比利亚火腿和各类西班牙传统肉制品，拥有百年传承的制作工艺',
    'Calle Mayor 123, Guijuelo',
    '萨拉曼卡',
    'madrid',
    '+34 923 123 456',
    'info@embutidosgarcia.es',
    'www.embutidosgarcia.es',
    true,
    1920,
    85,
    '年产伊比利亚火腿10万条',
    '日产各类香肠制品2000公斤',
    '恒温储存库容量5000平方米',
    4
  ),
  (
    'a2b3c4d5-6789-0123-4567-89abcdef0123',
    'Quesos La Mancha',
    '来自拉曼恰地区的传统奶酪制造商，专注于羊奶奶酪和传统曼彻格奶酪的生产',
    'Avenida del Queso 45, Tomelloso',
    '拉曼恰',
    'castilla',
    '+34 926 234 567',
    'info@quesoslamancha.es',
    'www.quesoslamancha.es',
    true,
    1945,
    60,
    '年产各类奶酪50万公斤',
    '日产奶酪1500公斤',
    '低温储存库容量2000平方米',
    3
  ),
  (
    'b3c4d5e6-7890-1234-5678-9abcdef01234',
    'Aceites del Sur',
    '安达卢西亚地区优质橄榄油生产商，拥有自己的橄榄园和现代化榨油设备',
    'Carretera de Jaén 78, Úbeda',
    '哈恩',
    'andalucia',
    '+34 953 345 678',
    'info@aceitesdelsur.es',
    'www.aceitesdelsur.es',
    true,
    1960,
    120,
    '年产特级初榨橄榄油100万升',
    '日产橄榄油3000升',
    '不锈钢储油罐容量50万升',
    5
  );

-- 插入制造商图片
INSERT INTO manufacturer_images (manufacturer_id, url, type, "order") VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=800&auto=format&fit=crop', 'factory', 1),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop', 'factory', 2),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop', 'factory', 1),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop', 'factory', 1);

-- 插入制造商与分类关系
INSERT INTO manufacturer_category_relations (manufacturer_id, category_id) VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'c1b6c3a2-1234-5678-90ab-cdef12345678'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'c2b6c3a2-1234-5678-90ab-cdef12345678'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'c3b6c3a2-1234-5678-90ab-cdef12345678');

-- 插入制造商产品
INSERT INTO manufacturer_products (manufacturer_id, name, description) VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', '伊比利亚火腿', '采用纯种伊比利亚黑蹄猪制作，手工腌制24-36个月'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', '西班牙香肠', '传统配方制作，采用优质猪肉和天然香料'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', '曼彻格奶酪', '使用当地绵羊奶制作的传统硬质奶酪，陈年6-12个月'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', '特级初榨橄榄油', '冷压榨制，酸度≤0.2%，果香浓郁');

-- 插入制造商认证
INSERT INTO manufacturer_certifications (manufacturer_id, name, issue_date, expiry_date) VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'ISO 9001:2015', '2023-01-15', '2026-01-14'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'HACCP', '2023-03-20', '2025-03-19'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'ISO 22000:2018', '2023-05-10', '2026-05-09'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', '有机认证', '2023-07-01', '2024-06-30');

-- 插入制造商出口国家
INSERT INTO manufacturer_export_countries (manufacturer_id, country_code) VALUES
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'CN'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'JP'),
  ('f1b6c3a2-1234-5678-90ab-cdef12345678', 'US'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'CN'),
  ('a2b3c4d5-6789-0123-4567-89abcdef0123', 'SG'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'CN'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'JP'),
  ('b3c4d5e6-7890-1234-5678-9abcdef01234', 'KR');