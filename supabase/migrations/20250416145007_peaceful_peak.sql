/*
  # 添加制造商生产能力数据

  1. 更新
    - 为现有制造商添加生产能力相关数据
    - 包括年产量、日产量、仓储容量和生产线数量
*/

-- 更新 Embutidos Garcia 的生产能力数据
UPDATE manufacturers 
SET 
  annual_production = '年产伊比利亚火腿10万条',
  daily_production = '日产各类香肠制品2000公斤',
  storage_capacity = '恒温储存库容量5000平方米',
  production_lines = 4
WHERE id = 'f1b6c3a2-1234-5678-90ab-cdef12345678';

-- 更新 Quesos La Mancha 的生产能力数据
UPDATE manufacturers 
SET 
  annual_production = '年产各类奶酪50万公斤',
  daily_production = '日产奶酪1500公斤',
  storage_capacity = '低温储存库容量2000平方米',
  production_lines = 3
WHERE id = 'a2b3c4d5-6789-0123-4567-89abcdef0123';

-- 更新 Aceites del Sur 的生产能力数据
UPDATE manufacturers 
SET 
  annual_production = '年产特级初榨橄榄油100万升',
  daily_production = '日产橄榄油3000升',
  storage_capacity = '不锈钢储油罐容量50万升',
  production_lines = 5
WHERE id = 'b3c4d5e6-7890-1234-5678-9abcdef01234';