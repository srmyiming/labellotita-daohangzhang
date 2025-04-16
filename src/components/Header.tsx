import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, Utensils, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export default function Header({ onSearch }: { onSearch: (term: string) => void }) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate('/');
      onSearch(searchValue);
    }
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
              to="/static-factory" 
              className={`font-medium transition-colors ${
                location.pathname === '/static-factory' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              静态示例
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
          
          <div className="hidden lg:block max-w-xs w-full">
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
              />
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
                    to="/static-factory" 
                    className="flex items-center gap-2 px-2 py-4 hover:bg-accent rounded-lg transition-colors"
                  >
                    静态示例
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