import { useState, useEffect, useMemo } from 'react';
import { Category, Region, Factory } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const SEARCH_HISTORY_KEY = 'manufacturer_search_history';
const MAX_HISTORY_ITEMS = 10;

interface UseManufacturerFiltersProps {
  onFactoryClick: (factory: Factory) => void;
}

export interface Filters {
  searchTerm: string;
  categoryId: string | null;
  regionId: string | null;
  exportCountry: string | null;
  tagSearch: string;
  selectedTags: string[];
}

interface RawManufacturer {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
  rating: number;
  is_pinned: boolean;
  pinned_at: string;
  manufacturer_images: Array<{
    url: string;
    type: string;
    order: number;
  }>;
  manufacturer_category_relations: Array<{
    category_id: string;
    manufacturer_categories: {
      id: string;
      name: string;
      icon: string;
    };
  }>;
  manufacturer_products: Array<{
    name: string;
    description: string;
  }>;
  manufacturer_export_countries: Array<{
    country_code: string;
  }>;
  manufacturer_tags: Array<{
    tags: {
      name: string;
    };
  }>;
}

export function useManufacturerFilters({ onFactoryClick }: UseManufacturerFiltersProps) {
  // 基础状态
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    categoryId: null,
    regionId: null,
    exportCountry: null,
    tagSearch: '',
    selectedTags: []
  });

  // 搜索历史记录
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // 数据状态
  const [data, setData] = useState({
    manufacturers: [] as Factory[],
    categories: [] as Category[],
    regions: [] as Region[],
    countries: [] as any[],
  });

  // 加载状态
  const [status, setStatus] = useState({
    loading: true,
    error: null as string | null
  });

  // 保存搜索历史
  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [
        term,
        ...prev.filter(item => item !== term)
      ].slice(0, MAX_HISTORY_ITEMS);
      
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 清除搜索历史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  // 获取基础数据（分类、地区、国家）
  useEffect(() => {
    async function fetchBaseData() {
      try {
        const [categoriesResult, regionsResult, countriesResult] = await Promise.all([
          supabase.from('category_counts').select('*'),
          supabase.from('regions').select('*'),
          supabase.from('countries').select('*')
        ]);

        if (categoriesResult.error) throw categoriesResult.error;
        if (regionsResult.error) throw regionsResult.error;
        if (countriesResult.error) throw countriesResult.error;

        setData(prev => ({
          ...prev,
          categories: categoriesResult.data.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.icon || 'box',
            count: category.manufacturer_count
          })),
          regions: regionsResult.data.map(region => ({
            id: region.code,
            name: region.name,
            count: 0
          })),
          countries: countriesResult.data
        }));
      } catch (error) {
        console.error('Error fetching base data:', error);
        toast.error('获取基础数据失败');
      }
    }

    fetchBaseData();
  }, []);

  // 获取制造商列表
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        setStatus(prev => ({ ...prev, loading: true, error: null }));
        
        // 基本查询
        let query = supabase
          .from('manufacturers')
          .select(`
            id,
            name,
            description,
            address,
            city,
            region,
            phone,
            email,
            website,
            verified,
            rating,
            is_pinned,
            pinned_at,
            manufacturer_images (
              url,
              type,
              order
            ),
            manufacturer_category_relations!inner (
              category_id,
              manufacturer_categories (
                id,
                name,
                icon
              )
            ),
            manufacturer_products (
              name,
              description
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

        // 应用过滤条件
        if (filters.searchTerm) {
          const searchTerm = filters.searchTerm.trim();
          
          // 根据多个字段进行搜索 - 使用单独的查询拼接结果
          const nameQuery = supabase
            .from('manufacturers')
            .select(`
              id,
              name,
              description,
              address,
              city,
              region,
              phone,
              email,
              website,
              verified,
              rating,
              is_pinned,
              pinned_at,
              manufacturer_images (
                url,
                type,
                order
              ),
              manufacturer_category_relations!inner (
                category_id,
                manufacturer_categories (
                  id,
                  name,
                  icon
                )
              ),
              manufacturer_products (
                name,
                description
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
            .ilike('name', `%${searchTerm}%`);
          
          const descQuery = supabase
            .from('manufacturers')
            .select(`
              id,
              name,
              description,
              address,
              city,
              region,
              phone,
              email,
              website,
              verified,
              rating,
              is_pinned,
              pinned_at,
              manufacturer_images (
                url,
                type,
                order
              ),
              manufacturer_category_relations!inner (
                category_id,
                manufacturer_categories (
                  id,
                  name,
                  icon
                )
              ),
              manufacturer_products (
                name,
                description
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
            .ilike('description', `%${searchTerm}%`);
          
          const [nameResult, descResult] = await Promise.all([
            nameQuery,
            descQuery
          ]);
          
          if (nameResult.error) throw nameResult.error;
          if (descResult.error) throw descResult.error;
          
          // 合并结果并去重
          const uniqueResults = new Map();
          
          [...(nameResult.data || []), ...(descResult.data || [])].forEach(item => {
            uniqueResults.set(item.id, item);
          });
          
          const rawManufacturers = Array.from(uniqueResults.values());
          
          // 转换数据结构以匹配Factory类型
          const manufacturers: Factory[] = (rawManufacturers as unknown as RawManufacturer[])?.map(raw => ({
            id: raw.id,
            name: raw.name,
            category: raw.manufacturer_category_relations?.[0]?.manufacturer_categories?.name || '',
            description: raw.description,
            address: raw.address,
            city: raw.city,
            phone: raw.phone,
            email: raw.email,
            website: raw.website,
            products: raw.manufacturer_products?.map(p => p.name) || [],
            verified: raw.verified,
            rating: raw.rating,
            region: raw.region,
            is_pinned: raw.is_pinned,
            pinned_at: raw.pinned_at,
            manufacturer_tags: raw.manufacturer_tags,
            manufacturer_export_countries: raw.manufacturer_export_countries,
            factoryImages: raw.manufacturer_images?.map(img => img.url) || []
          })) || [];
          
          setData(prev => ({
            ...prev,
            manufacturers
          }));
          setStatus(prev => ({ ...prev, loading: false }));
          return;
        }

        // 如果没有搜索条件,使用默认查询
        if (filters.categoryId) {
          query = query.eq('manufacturer_category_relations.category_id', filters.categoryId);
        }

        if (filters.regionId) {
          query = query.eq('region', filters.regionId);
        }

        if (filters.exportCountry) {
          query = query.eq('manufacturer_export_countries.country_code', filters.exportCountry);
        }

        // 排序
        query = query
          .order('is_pinned', { ascending: false })
          .order('pinned_at', { ascending: false })
          .order('rating', { ascending: false });

        const { data: rawManufacturers, error } = await query;

        if (error) throw error;

        // 转换数据结构以匹配Factory类型
        const manufacturers: Factory[] = (rawManufacturers as unknown as RawManufacturer[])?.map(raw => ({
          id: raw.id,
          name: raw.name,
          category: raw.manufacturer_category_relations?.[0]?.manufacturer_categories?.name || '',
          description: raw.description,
          address: raw.address,
          city: raw.city,
          phone: raw.phone,
          email: raw.email,
          website: raw.website,
          products: raw.manufacturer_products?.map(p => p.name) || [],
          verified: raw.verified,
          rating: raw.rating,
          region: raw.region,
          is_pinned: raw.is_pinned,
          pinned_at: raw.pinned_at,
          manufacturer_tags: raw.manufacturer_tags,
          manufacturer_export_countries: raw.manufacturer_export_countries,
          factoryImages: raw.manufacturer_images?.map(img => img.url) || []
        })) || [];

        setData(prev => ({
          ...prev,
          manufacturers
        }));
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
        setStatus(prev => ({
          ...prev,
          error: '获取制造商列表失败'
        }));
        toast.error('获取制造商列表失败');
      } finally {
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    const timer = setTimeout(fetchManufacturers, 300);
    return () => clearTimeout(timer);
  }, [
    filters.searchTerm,
    filters.categoryId,
    filters.regionId,
    filters.exportCountry
  ]);

  // 从制造商数据中提取标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    data.manufacturers.forEach(manufacturer => {
      if (manufacturer.tags && Array.isArray(manufacturer.tags)) {
        manufacturer.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [data.manufacturers]);

  // 过滤标签
  const filteredTags = useMemo(() => {
    return allTags.filter(tag =>
      !filters.tagSearch || tag.toLowerCase().includes(filters.tagSearch.toLowerCase())
    );
  }, [allTags, filters.tagSearch]);

  // 生成搜索建议
  const searchSuggestions = useMemo(() => {
    if (!filters.searchTerm) return [];
    
    const suggestions: Array<{ type: 'manufacturer' | 'product' | 'tag'; text: string }> = [];
    const searchTerm = filters.searchTerm.toLowerCase();
    const maxSuggestions = 5;
    
    // 从制造商名称中获取建议
    data.manufacturers.forEach(manufacturer => {
      if (suggestions.length >= maxSuggestions) return;
      if (manufacturer.name.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'manufacturer',
          text: manufacturer.name
        });
      }
    });

    // 从产品中获取建议
    data.manufacturers.forEach(manufacturer => {
      if (suggestions.length >= maxSuggestions) return;
      manufacturer.products?.forEach(product => {
        if (suggestions.length >= maxSuggestions) return;
        if (product.toLowerCase().includes(searchTerm)) {
          suggestions.push({
            type: 'product',
            text: product
          });
        }
      });
    });

    // 从标签中获取建议
    filteredTags.forEach(tag => {
      if (suggestions.length >= maxSuggestions) return;
      if (tag.toLowerCase().includes(searchTerm)) {
        suggestions.push({
          type: 'tag',
          text: tag
        });
      }
    });

    return suggestions;
  }, [filters.searchTerm, data.manufacturers, filteredTags]);

  // 更新过滤器
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'searchTerm' && value) {
      saveToHistory(value);
    }
  };

  // 重置所有过滤器
  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      categoryId: null,
      regionId: null,
      exportCountry: null,
      tagSearch: '',
      selectedTags: []
    });
  };

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  return {
    // 过滤器状态和操作
    filters,
    updateFilter,
    resetFilters,
    toggleTag,
    
    // 数据
    ...data,
    
    // UI状态
    loading: status.loading,
    error: status.error,
    
    // 计算属性
    filteredTags,
    searchSuggestions,
    
    // 动作
    onFactoryClick,
    
    // 搜索历史
    searchHistory,
    clearHistory
  };
}