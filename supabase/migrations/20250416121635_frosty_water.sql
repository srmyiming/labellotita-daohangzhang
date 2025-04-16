/*
  # 添加地区和出口国家表

  1. 新建表
    - `regions` - 地区表
      - `id` (uuid, 主键)
      - `name` (text) - 地区名称
      - `code` (text) - 地区代码
      - `created_at` (timestamptz)
      
    - `countries` - 国家表
      - `id` (uuid, 主键)
      - `name` (text) - 国家名称
      - `code` (text) - 国家代码
      - `created_at` (timestamptz)

  2. 安全设置
    - 启用 RLS
    - 添加公开读取策略
*/

-- 创建地区表
CREATE TABLE regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- 创建国家表
CREATE TABLE countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- 启用 RLS
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

-- 创建公共访问策略
CREATE POLICY "允许公开读取地区信息" ON regions
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取国家信息" ON countries
  FOR SELECT USING (true);

-- 插入初始数据
INSERT INTO regions (name, code) VALUES
  ('马德里', 'madrid'),
  ('加泰罗尼亚', 'cataluna'),
  ('安达卢西亚', 'andalucia'),
  ('瓦伦西亚', 'valencia'),
  ('加利西亚', 'galicia'),
  ('卡斯蒂利亚', 'castilla');

INSERT INTO countries (name, code) VALUES
  ('中国', 'CN'),
  ('日本', 'JP'),
  ('韩国', 'KR'),
  ('新加坡', 'SG'),
  ('马来西亚', 'MY'),
  ('美国', 'US'),
  ('加拿大', 'CA'),
  ('英国', 'GB'),
  ('法国', 'FR'),
  ('德国', 'DE'),
  ('意大利', 'IT'),
  ('西班牙', 'ES'),
  ('澳大利亚', 'AU');