import React, { useState, useRef, useEffect } from 'react';
import { Search, Utensils, Award, Users, Clock, Tag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onSearch: (term: string) => void;
  searchHistory?: string[];
  suggestions?: Array<{type: string, text: string}>;
}

export default function Hero({ onSearch, searchHistory = [], suggestions = [] }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // 如果输入有内容,显示建议
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    if (searchValue.trim()) {
      onSearch(searchValue);
      navigate(`/manufacturers?search=${encodeURIComponent(searchValue.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      handleSubmit();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setSearchValue(text);
    onSearch(text);
    navigate(`/manufacturers?search=${encodeURIComponent(text.trim())}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-32">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">西班牙食品目录</h1>
        <p className="text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
          在一个平台上找到西班牙最好的食品制造商和产品
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              className="w-full px-12 py-5 rounded-full shadow-xl text-lg bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="搜索制造商、产品或分类..."
              value={searchValue}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              onFocus={() => searchValue.trim() && setShowSuggestions(true)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-yellow-600" />
            </div>
            
            {/* 清除按钮 */}
            {searchValue && (
              <button 
                className="absolute right-32 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                onClick={() => {
                  setSearchValue('');
                  setShowSuggestions(false);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleSubmit}
            >
              搜索
            </button>
            
            {/* 搜索建议和历史记录下拉框 */}
            {showSuggestions && (searchHistory.length > 0 || suggestions.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-xl shadow-2xl border text-left z-10">
                {/* 搜索建议 */}
                {suggestions.length > 0 && (
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-500 font-medium">推荐搜索</div>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={`suggestion-${index}`}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          {suggestion.type === '制造商' && <Search className="h-5 w-5 text-yellow-600" />}
                          {suggestion.type === '产品' && <Tag className="h-5 w-5 text-orange-600" />}
                          {suggestion.type === '分类' && <Tag className="h-5 w-5 text-red-600" />}
                          <div className="flex-1 flex flex-col">
                            <span className="font-medium">{suggestion.text}</span>
                            <span className="text-xs text-gray-500">{suggestion.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 搜索历史 */}
                {searchHistory.length > 0 && (
                  <div className="p-2 border-t">
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm text-gray-500 font-medium">搜索历史</span>
                      <button 
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                        onClick={() => {/* 清除历史 */}}
                      >
                        清除
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.map((term, index) => (
                        <button
                          key={`history-${index}`}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors"
                          onClick={() => handleSuggestionClick(term)}
                        >
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-white">
            <Utensils className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">优质制造商</h3>
            <p className="text-white/80">严选顶级西班牙食品制造商</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Award className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">品质保证</h3>
            <p className="text-white/80">所有制造商经过严格认证</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Users className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">直接对接</h3>
            <p className="text-white/80">与制造商直接建立联系</p>
          </div>
        </div>
      </div>
    </div>
  );
}