/**
 * 制造商接口
 * 
 * @future API: GET /api/manufacturers/[id]
 * @future API: GET /api/manufacturers?category=&region=&search=
 */
export interface Factory {
  id: string;
  name: string;
  category: string;
  categoryName?: string; // 分类名称
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  products: string[];
  verified?: boolean;
  productCount?: number;
  factoryImages?: string[];
  imageUrl?: string;
  tags?: string[];
  exportCountries?: string[];
  region?: string;
  rating?: number;
  updatedAt?: string;
  catalog_pdf_url?: string;
  founded_year?: number;
  employee_count?: number;
  annual_production?: string;
  daily_production?: string;
  storage_capacity?: string;
  production_lines?: number;
  updated_at?: string;
  manufacturer_tags?: Array<{ tags: { name: string } }>;
  manufacturer_certifications?: Array<{
    name: string;
    issue_date: string;
    expiry_date: string;
  }>;
  manufacturer_export_countries?: Array<{
    country_code: string;
  }>;
  created_at?: string;
  is_pinned?: boolean;
  pinned_at?: string;
  recommended?: boolean;
}

/**
 * 分类接口
 * 
 * @future API: GET /api/categories
 */
export type Category = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

/**
 * 地区接口
 * 
 * @future API: GET /api/regions
 */
export type Region = {
  id: string;
  name: string;
  count: number;
};