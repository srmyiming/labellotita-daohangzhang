/*
  # 创建西班牙食品制造商目录数据库表

  1. 新建表
    - `manufacturers` - 制造商主表
      - `id` (uuid, 主键)
      - `name` (text) - 制造商名称
      - `description` (text) - 制造商描述
      - `address` (text) - 地址
      - `city` (text) - 城市
      - `region` (text) - 地区
      - `phone` (text) - 电话
      - `email` (text) - 邮箱
      - `website` (text) - 网站
      - `verified` (boolean) - 是否认证
      - `founded_year` (integer) - 成立年份
      - `employee_count` (integer) - 员工数量
      - `annual_production` (text) - 年产量
      - `daily_production` (text) - 日产量
      - `storage_capacity` (text) - 仓储容量
      - `production_lines` (integer) - 生产线数量
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `manufacturer_images` - 制造商图片
      - `id` (uuid, 主键)
      - `manufacturer_id` (uuid, 外键)
      - `url` (text) - 图片URL
      - `type` (text) - 图片类型(factory/product/certification)
      - `order` (integer) - 排序
      
    - `manufacturer_categories` - 制造商分类
      - `id` (uuid, 主键)
      - `name` (text) - 分类名称
      - `icon` (text) - 图标名称
      
    - `manufacturer_category_relations` - 制造商与分类关系
      - `manufacturer_id` (uuid, 外键)
      - `category_id` (uuid, 外键)
      
    - `manufacturer_products` - 制造商产品
      - `id` (uuid, 主键)
      - `manufacturer_id` (uuid, 外键)
      - `name` (text) - 产品名称
      - `description` (text) - 产品描述
      
    - `manufacturer_certifications` - 制造商认证
      - `id` (uuid, 主键)
      - `manufacturer_id` (uuid, 外键)
      - `name` (text) - 认证名称
      - `issue_date` (date) - 发证日期
      - `expiry_date` (date) - 过期日期
      
    - `manufacturer_export_countries` - 制造商出口国家
      - `manufacturer_id` (uuid, 外键)
      - `country_code` (text) - 国家代码
      
  2. 安全设置
    - 启用所有表的RLS
    - 添加适当的访问策略
*/

-- 创建制造商表
CREATE TABLE manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text,
  city text,
  region text,
  phone text,
  email text,
  website text,
  verified boolean DEFAULT false,
  founded_year integer,
  employee_count integer,
  annual_production text,
  daily_production text,
  storage_capacity text,
  production_lines integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建制造商图片表
CREATE TABLE manufacturer_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  url text NOT NULL,
  type text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 创建制造商分类表
CREATE TABLE manufacturer_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- 创建制造商与分类关系表
CREATE TABLE manufacturer_category_relations (
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  category_id uuid REFERENCES manufacturer_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (manufacturer_id, category_id)
);

-- 创建制造商产品表
CREATE TABLE manufacturer_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- 创建制造商认证表
CREATE TABLE manufacturer_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  name text NOT NULL,
  issue_date date,
  expiry_date date,
  created_at timestamptz DEFAULT now()
);

-- 创建制造商出口国家表
CREATE TABLE manufacturer_export_countries (
  manufacturer_id uuid REFERENCES manufacturers(id) ON DELETE CASCADE,
  country_code text NOT NULL,
  PRIMARY KEY (manufacturer_id, country_code)
);

-- 启用RLS
ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_category_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturer_export_countries ENABLE ROW LEVEL SECURITY;

-- 创建公共访问策略
CREATE POLICY "允许公开读取制造商信息" ON manufacturers
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商图片" ON manufacturer_images
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商分类" ON manufacturer_categories
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商分类关系" ON manufacturer_category_relations
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商产品" ON manufacturer_products
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商认证" ON manufacturer_certifications
  FOR SELECT USING (true);

CREATE POLICY "允许公开读取制造商出口国家" ON manufacturer_export_countries
  FOR SELECT USING (true);

-- 创建更新触发器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_manufacturers_updated_at
  BEFORE UPDATE ON manufacturers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();