import React from 'react';
import { Filter, MapPinned, Globe, Tags } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Category, Region } from '../../types';

interface ManufacturerFiltersProps {
  categories: Category[];
  regions: Region[];
  countries: any[];
  filters: {
    categoryId: string | null;
    regionId: string | null;
    exportCountry: string | null;
    tagSearch: string;
    selectedTags: string[];
  };
  filteredTags: string[];
  onFilterChange: (key: string, value: any) => void;
  onTagToggle: (tag: string) => void;
  onReset: () => void;
}

export default function ManufacturerFilters({
  categories,
  regions,
  countries,
  filters,
  filteredTags,
  onFilterChange,
  onTagToggle,
  onReset,
}: ManufacturerFiltersProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <h2 className="font-medium mb-4 flex items-center gap-2">
        <Filter className="w-4 h-4" />
        筛选
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">分类</h3>
          <Select
            value={filters.categoryId || "all"}
            onValueChange={(value) => 
              onFilterChange('categoryId', value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部分类</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                  <span className="text-gray-500 ml-1">({category.count})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <MapPinned className="w-4 h-4" />
            地区
          </h3>
          <Select
            value={filters.regionId || "all"}
            onValueChange={(value) => 
              onFilterChange('regionId', value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择地区" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部地区</SelectItem>
              {regions.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            出口国家
          </h3>
          <Select
            value={filters.exportCountry || "all"}
            onValueChange={(value) => 
              onFilterChange('exportCountry', value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择出口国家" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部国家</SelectItem>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Tags className="w-4 h-4" />
            标签筛选
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="搜索标签..."
              className="w-full px-3 py-2 border rounded-lg text-sm"
              value={filters.tagSearch}
              onChange={(e) => onFilterChange('tagSearch', e.target.value)}
            />
            <div className="max-h-40 overflow-y-auto space-y-2">
              {filteredTags.map(tag => (
                <label key={tag} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.selectedTags.includes(tag)}
                    onChange={() => onTagToggle(tag)}
                    className="mr-2"
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onReset}
          className="w-full py-2 text-sm font-medium text-center border rounded-lg hover:bg-gray-50"
        >
          重置筛选
        </button>
      </div>
    </div>
  );
}