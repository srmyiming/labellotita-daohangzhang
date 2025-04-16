import { useState, useEffect, useMemo } from 'react';
import { Category, Region, Factory } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface UseManufacturerFiltersProps {
  onFactoryClick: (factory: Factory) => void;
}

export function useManufacturerFilters({ onFactoryClick }: UseManufacturerFiltersProps) {
  // 基础状态
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryId: null as string | null,
    regionId: null as string | null,
    exportCountry: null as string | null,
    tagSearch: '',
    selectedTags: [] as string[]
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
          query = query.ilike('name', `%${filters.searchTerm}%`);
        }

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

        const { data: manufacturers, error } = await query;

        if (error) throw error;

        setData(prev => ({
          ...prev,
          manufacturers: manufacturers || []
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

  // 更新过滤器
  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
    
    // 动作
    onFactoryClick
  };
}