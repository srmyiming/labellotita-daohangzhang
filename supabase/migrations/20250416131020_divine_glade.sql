/*
  # 添加制造商推荐、评分和置顶功能

  1. 新增字段
    - `recommended` (boolean) - 是否推荐到首页
    - `rating` (integer) - 评分(1-5星)
    - `is_pinned` (boolean) - 是否置顶
    - `pinned_at` (timestamptz) - 置顶时间
    
  2. 更新现有表
    - 为 manufacturers 表添加新字段
    - 添加默认值和约束
    
  3. 索引
    - 添加索引以优化查询性能
*/

-- 添加新字段
DO $$ 
BEGIN
  -- 添加 recommended 字段
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'manufacturers' AND column_name = 'recommended'
  ) THEN
    ALTER TABLE manufacturers ADD COLUMN recommended boolean DEFAULT false;
  END IF;

  -- 添加 rating 字段
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'manufacturers' AND column_name = 'rating'
  ) THEN
    ALTER TABLE manufacturers ADD COLUMN rating integer CHECK (rating >= 1 AND rating <= 5);
  END IF;

  -- 添加 is_pinned 字段
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'manufacturers' AND column_name = 'is_pinned'
  ) THEN
    ALTER TABLE manufacturers ADD COLUMN is_pinned boolean DEFAULT false;
  END IF;

  -- 添加 pinned_at 字段
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'manufacturers' AND column_name = 'pinned_at'
  ) THEN
    ALTER TABLE manufacturers ADD COLUMN pinned_at timestamptz;
  END IF;
END $$;

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_manufacturers_recommended ON manufacturers(recommended) WHERE recommended = true;
CREATE INDEX IF NOT EXISTS idx_manufacturers_rating ON manufacturers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_manufacturers_is_pinned ON manufacturers(is_pinned, pinned_at DESC) WHERE is_pinned = true;