import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Utensils, X, Clock } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export default function Header({ 
  onSearch, 
  searchHistory = [],
  suggestions = []
}: { 
  onSearch: (term: string) => void,
  searchHistory?: string[],
  suggestions?: Array<{type: string, text: string}>
}) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
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
    onSearch(value);

    // 如果输入有内容,显示建议
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/manufacturers?search=${encodeURIComponent(searchValue.trim())}`);
      onSearch(searchValue);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setSearchValue(text);
    onSearch(text);
    navigate(`/manufacturers?search=${encodeURIComponent(text.trim())}`);
    setShowSuggestions(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-600">
                西班牙食品目录
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/categories" 
              className={`font-medium transition-colors ${
                location.pathname === '/categories' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              分类
            </Link>
            <Link 
              to="/manufacturers" 
              className={`font-medium transition-colors ${
                location.pathname === '/manufacturers' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              制造商
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                location.pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              关于我们
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                location.pathname === '/contact' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              联系我们
            </Link>
          </nav>
          
          <div className="hidden lg:block max-w-xs w-full" ref={searchRef}>
            <label htmlFor="search" className="sr-only">搜索工厂</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-3 py-2 border rounded-full text-sm bg-muted/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                placeholder="搜索工厂名称或产品..."
                value={searchValue}
                type="search"
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                onFocus={() => searchValue.trim() && setShowSuggestions(true)}
              />
              
              {/* 清除按钮 */}
              {searchValue && (
                <button
                  onClick={() => {
                    setSearchValue('');
                    onSearch('');
                    setShowSuggestions(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
              
              {/* 搜索建议下拉框 */}
              {showSuggestions && (searchHistory.length > 0 || suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-lg border z-50">
                  {/* 搜索建议 */}
                  {suggestions.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-xs text-muted-foreground">搜索建议</div>
                      <div className="max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={`suggestion-${index}`}
                            className="w-full px-3 py-2 text-left hover:bg-muted text-sm flex items-center"
                            onClick={() => handleSuggestionClick(suggestion.text)}
                          >
                            <Search className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{suggestion.text}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {suggestion.type}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="border-t"></div>
                    </>
                  )}
                  
                  {/* 搜索历史 */}
                  {searchHistory.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-xs text-muted-foreground">搜索历史</div>
                      <div className="max-h-40 overflow-y-auto">
                        {searchHistory.map((term, index) => (
                          <button
                            key={`history-${index}`}
                            className="w-full px-3 py-2 text-left hover:bg-muted text-sm flex items-center"
                            onClick={() => handleSuggestionClick(term)}
                          >
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link 
                    to="/categories" 
                    className="flex items-center gap-2 px-2 py-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    分类
                  </Link>
                  <Link 
                    to="/manufacturers" 
                    className="flex items-center gap-2 px-2 py-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    制造商
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center gap-2 px-2 py-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    关于我们
                  </Link>
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-2 px-2 py-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    联系我们
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}