/*
  # 将所有制造商标记为推荐

  1. 更新操作
    - 将所有制造商的 recommended 字段设置为 true
    - 为每个制造商设置一个随机的评分 (1-5)
*/

-- 更新所有制造商为推荐状态
UPDATE manufacturers 
SET 
  recommended = true,
  rating = floor(random() * 5 + 1)::integer
WHERE 
  recommended IS NULL OR recommended = false;