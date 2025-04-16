/*
  # 添加分类统计视图

  1. 新建视图
    - 创建 category_counts 视图来统计每个分类下的制造商数量
    
  2. 功能说明
    - 实时统计每个分类下的制造商数量
    - 通过关联表计算准确的制造商数量
    
  3. 使用说明
    - 可以通过 SELECT * FROM category_counts 获取分类统计数据
*/

-- 创建分类统计视图
CREATE OR REPLACE VIEW category_counts AS
SELECT 
  mc.id,
  mc.name,
  mc.icon,
  COUNT(DISTINCT mcr.manufacturer_id) as manufacturer_count
FROM 
  manufacturer_categories mc
LEFT JOIN 
  manufacturer_category_relations mcr ON mc.id = mcr.category_id
GROUP BY 
  mc.id, mc.name, mc.icon;