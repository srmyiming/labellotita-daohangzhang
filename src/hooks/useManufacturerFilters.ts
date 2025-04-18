import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Category, Region, Factory } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const SEARCH_HISTORY_KEY = 'manufacturer_search_history';
const MAX_HISTORY_ITEMS = 10;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 缓存结构
interface Cache {
  timestamp: number;
  data: any;
}

const cache: {
  manufacturers?: Cache;
  categories?: Cache;
  regions?: Cache;
  countries?: Cache;
} = {};

// 检查缓存是否有效
const isCacheValid = (cacheEntry?: Cache) => {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

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
  const [searchParams, setSearchParams] = useSearchParams();
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 基础状态
  const [filters, setFilters] = useState<Filters>({
    searchTerm: searchParams.get('search') || '',
    categoryId: searchParams.get('category') || null,
    regionId: searchParams.get('region') || null,
    exportCountry: searchParams.get('country') || null,
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

  // 优化获取基础数据的函数
  const fetchBaseData = useCallback(async () => {
    if (isCacheValid(cache.categories) && isCacheValid(cache.regions) && isCacheValid(cache.countries)) {
      setData(prev => ({
        ...prev,
        categories: cache.categories!.data,
        regions: cache.regions!.data,
        countries: cache.countries!.data
      }));
      return;
    }

    try {
      const [categoriesResult, regionsResult, countriesResult] = await Promise.all([
        supabase.from('category_counts').select('*').order('manufacturer_count', { ascending: false }),
        supabase.from('regions').select('*').order('name'),
        supabase.from('countries').select('*').order('name')
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (regionsResult.error) throw regionsResult.error;
      if (countriesResult.error) throw countriesResult.error;

      const categories = categoriesResult.data?.map(category => ({
        id: category.id,
        name: category.name,
        icon: category.icon || 'box',
        count: category.manufacturer_count
      })) || [];

      const regions = regionsResult.data?.map(region => ({
        id: region.code,
        name: region.name,
        count: 0
      })) || [];

      const timestamp = Date.now();
      cache.categories = { timestamp, data: categories };
      cache.regions = { timestamp, data: regions };
      cache.countries = { timestamp, data: countriesResult.data };

      setData(prev => ({
        ...prev,
        categories,
        regions,
        countries: countriesResult.data
      }));
    } catch (error) {
      console.error('获取基础数据失败:', error);
      toast.error('获取基础数据失败，请刷新页面重试');
    }
  }, []);

  // 优化获取制造商列表的函数
  const fetchManufacturers = useCallback(async () => {
    try {
      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setStatus(prev => ({ ...prev, loading: true, error: null }));

      // 构建缓存键
      const cacheKey = JSON.stringify({
        searchTerm: filters.searchTerm,
        categoryId: filters.categoryId,
        regionId: filters.regionId,
        exportCountry: filters.exportCountry
      });

      // 检查缓存
      const cachedData = cache.manufacturers?.data?.[cacheKey];
      if (cachedData && isCacheValid(cache.manufacturers)) {
        setData(prev => ({
          ...prev,
          manufacturers: cachedData
        }));
        setStatus(prev => ({ ...prev, loading: false }));
        return;
      }

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
          manufacturer_category_relations (
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
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (filters.categoryId) {
        query = query
          .eq('manufacturer_category_relations.category_id', filters.categoryId)
          .not('manufacturer_category_relations', 'is', null);
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

      const manufacturers = (rawManufacturers as unknown as RawManufacturer[])?.map(raw => ({
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

      // 更新缓存
      if (!cache.manufacturers) {
        cache.manufacturers = { timestamp: Date.now(), data: {} };
      }
      cache.manufacturers.data[cacheKey] = manufacturers;

      setData(prev => ({
        ...prev,
        manufacturers
      }));
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching manufacturers:', error);
        toast.error('获取制造商列表失败');
      }
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [filters]);

  // 使用防抖处理搜索
  const debouncedFetchManufacturers = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(fetchManufacturers, 300);
  }, [fetchManufacturers]);

  // 获取基础数据
  useEffect(() => {
    fetchBaseData();
  }, [fetchBaseData]);

  // 获取制造商列表
  useEffect(() => {
    debouncedFetchManufacturers();
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedFetchManufacturers]);

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
  const updateFilter = useCallback((key: keyof Filters, value: any) => {
    // 如果值没有变化，直接返回
    if (filters[key] === value) {
      return;
    }

    setFilters(prev => ({ ...prev, [key]: value }));
    
    // 更新URL参数
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      switch (key) {
        case 'searchTerm':
          if (value !== searchParams.get('search')) {
            newSearchParams.set('search', value);
          }
          break;
        case 'categoryId':
          if (value !== searchParams.get('category')) {
            newSearchParams.set('category', value);
          }
          break;
        case 'regionId':
          if (value !== searchParams.get('region')) {
            newSearchParams.set('region', value);
          }
          break;
        case 'exportCountry':
          if (value !== searchParams.get('country')) {
            newSearchParams.set('country', value);
          }
          break;
      }
    } else {
      switch (key) {
        case 'searchTerm':
          newSearchParams.delete('search');
          break;
        case 'categoryId':
          newSearchParams.delete('category');
          break;
        case 'regionId':
          newSearchParams.delete('region');
          break;
        case 'exportCountry':
          newSearchParams.delete('country');
          break;
      }
    }

    // 只有当参数真正发生变化时才更新 URL
    const currentParams = new URLSearchParams(searchParams).toString();
    const newParams = newSearchParams.toString();
    if (currentParams !== newParams) {
      setSearchParams(newSearchParams, { replace: true }); // 使用 replace 而不是 push
    }

    if (key === 'searchTerm' && value) {
      saveToHistory(value);
    }
  }, [filters, searchParams, setSearchParams]);

  // 重置所有过滤器
  const resetFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      categoryId: null,
      regionId: null,
      exportCountry: null,
      tagSearch: '',
      selectedTags: []
    });
    // 清除所有URL参数，使用 replace 而不是 push
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

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