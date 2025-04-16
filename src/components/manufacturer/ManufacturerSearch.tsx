import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, X, Tag } from 'lucide-react';

interface ManufacturerSearchProps {
  value: string;
  onChange: (term: string) => void;
  searchHistory?: string[];
  onClearHistory?: () => void;
  suggestions?: Array<{
    type: 'manufacturer' | 'product' | 'tag';
    text: string;
  }>;
}

export default function ManufacturerSearch({ 
  value, 
  onChange,
  searchHistory = [],
  onClearHistory,
  suggestions = []
}: ManufacturerSearchProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="搜索制造商名称、产品或标签..."
        className="w-full pl-12 pr-4 h-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm hover:shadow transition-shadow"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />

      {/* 搜索建议和历史记录下拉框 */}
      {showDropdown && (value || searchHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          {/* 搜索建议 */}
          {value && suggestions.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm text-gray-500">搜索建议</div>
              <div className="max-h-40 overflow-y-auto border-b border-gray-100">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`suggestion-${index}`}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    onClick={() => {
                      onChange(suggestion.text);
                      setShowDropdown(false);
                    }}
                  >
                    {suggestion.type === 'manufacturer' && <Search className="h-4 w-4 text-gray-400" />}
                    {suggestion.type === 'product' && <Tag className="h-4 w-4 text-gray-400" />}
                    {suggestion.type === 'tag' && <Tag className="h-4 w-4 text-gray-400" />}
                    <span>{suggestion.text}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {suggestion.type === 'manufacturer' ? '制造商' : 
                       suggestion.type === 'product' ? '产品' : '标签'}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 搜索历史 */}
          {searchHistory.length > 0 && (
            <>
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">搜索历史</span>
                <button
                  onClick={() => {
                    onClearHistory?.();
                    setShowDropdown(false);
                  }}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  清除历史
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {searchHistory.map((term, index) => (
                  <button
                    key={`history-${index}`}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    onClick={() => {
                      onChange(term);
                      setShowDropdown(false);
                    }}
                  >
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* 清除按钮 */}
      {value && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => onChange('')}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}