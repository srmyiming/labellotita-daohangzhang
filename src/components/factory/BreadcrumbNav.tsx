import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbNavProps {
  factoryName: string;
  onBack: () => void;
}

export function BreadcrumbNav({ factoryName, onBack }: BreadcrumbNavProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex space-x-2 text-sm text-muted-foreground">
          <button 
            onClick={onBack} 
            className="text-primary hover:text-primary/90 transition-colors"
          >
            首页
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => navigate('/')} 
            className="text-primary hover:text-primary/90 transition-colors"
          >
            制造商
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{factoryName}</span>
        </nav>
      </div>
    </div>
  );
}

export default BreadcrumbNav