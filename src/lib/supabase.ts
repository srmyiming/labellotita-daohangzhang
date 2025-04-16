import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

/**
 * Supabase API 客户端
 * 
 * @future API端点:
 * - manufacturers
 *   - GET /rest/v1/manufacturers - 获取制造商列表
 *   - GET /rest/v1/manufacturers?id=eq.{id} - 获取单个制造商
 *   - GET /rest/v1/manufacturers?category=eq.{category} - 按分类筛选
 *   - GET /rest/v1/manufacturers?region=eq.{region} - 按地区筛选
 *   - GET /rest/v1/manufacturers?name=ilike.*{search}* - 搜索制造商
 * 
 * - manufacturer_images
 *   - GET /rest/v1/manufacturer_images?manufacturer_id=eq.{id} - 获取制造商图片
 * 
 * - manufacturer_categories
 *   - GET /rest/v1/manufacturer_categories - 获取所有分类
 * 
 * - manufacturer_products
 *   - GET /rest/v1/manufacturer_products?manufacturer_id=eq.{id} - 获取制造商产品
 * 
 * - manufacturer_certifications
 *   - GET /rest/v1/manufacturer_certifications?manufacturer_id=eq.{id} - 获取认证
 * 
 * - manufacturer_export_countries
 *   - GET /rest/v1/manufacturer_export_countries?manufacturer_id=eq.{id} - 获取出口国家
 */
// 创建 Supabase 客户端实例
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 制造商相关API
export const manufacturersApi = {
  // 获取推荐制造商列表
  getRecommended: async () => {
    const { data, error } = await supabase
      .from('manufacturers')
      .select(`
        *,
        manufacturer_images (
          url,
          type
        ),
        manufacturer_category_relations (
          manufacturer_categories (
            name,
            icon
          )
        ),
        manufacturer_products (
          name
        ),
        manufacturer_export_countries (
          country_code
        )
      `)
      .eq('recommended', true)
      .eq('verified', true)
      .order('is_pinned', { ascending: false })
      .order('pinned_at', { ascending: false })
      .order('rating', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data;
  },

  // 获取制造商详情
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('manufacturers')
      .select(`
        *,
        manufacturer_images (
          url,
          type,
          order
        ),
        manufacturer_category_relations (
          manufacturer_categories (
            name,
            icon
          )
        ),
        manufacturer_products (
          name,
          description
        ),
        manufacturer_certifications (
          name,
          issue_date,
          expiry_date
        ),
        manufacturer_export_countries (
          country_code
        ),
        manufacturer_tags (
          tags (
            name
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // 搜索制造商
  search: async (params: {
    searchTerm?: string;
    categoryId?: string;
    region?: string;
    exportCountry?: string;
    tags?: string[];
  }) => {
    let query = supabase
      .from('manufacturers')
      .select(`
        *,
        manufacturer_images (
          url,
          type
        ),
        manufacturer_category_relations (
          manufacturer_categories (
            name,
            icon
          )
        ),
        manufacturer_products (
          name
        ),
        manufacturer_export_countries (
          country_code
        ),
        manufacturer_tags (
          tags (
            name
          )
        )
      `);

    if (params.searchTerm) {
      query = query.or(`name.ilike.%${params.searchTerm}%,description.ilike.%${params.searchTerm}%,manufacturer_products.name.ilike.%${params.searchTerm}%`);
    }

    if (params.categoryId) {
      query = query.eq('manufacturer_category_relations.category_id', params.categoryId);
    }

    if (params.region) {
      query = query.eq('region', params.region);
    }

    if (params.exportCountry) {
      query = query.eq('manufacturer_export_countries.country_code', params.exportCountry);
    }

    // 按置顶和评分排序
    query = query
      .order('is_pinned', { ascending: false })
      .order('pinned_at', { ascending: false })
      .order('rating', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
};

// 地区相关 API
export const regionsApi = {
  // 获取所有地区
  getAll: async () => {
    const { data, error } = await supabase
      .from('regions')
      .select('*');

    if (error) throw error;
    return data;
  }
};

// 国家相关 API
export const countriesApi = {
  // 获取所有国家
  getAll: async () => {
    const { data, error } = await supabase
      .from('countries')
      .select('*');

    if (error) throw error;
    return data;
  }
};

// PDF 文件存储相关 API
export const storageApi = {
  // 上传 PDF 文件
  uploadPdf: async (manufacturerId: string, file: File) => {
    const fileName = `${manufacturerId}/catalog.pdf`;
    const { data, error } = await supabase.storage
      .from('catalogs')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return data;
  },

  // 获取 PDF 文件 URL
  getPdfUrl: (manufacturerId: string) => {
    const { data } = supabase.storage
      .from('catalogs')
      .getPublicUrl(`${manufacturerId}/catalog.pdf`);
    
    return data.publicUrl;
  },

  // 删除 PDF 文件
  deletePdf: async (manufacturerId: string) => {
    const { error } = await supabase.storage
      .from('catalogs')
      .remove([`${manufacturerId}/catalog.pdf`]);

    if (error) throw error;
  }
};