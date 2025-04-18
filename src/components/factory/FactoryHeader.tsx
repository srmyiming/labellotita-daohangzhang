import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

export interface FactoryHeaderProps {
  name: string;
  verified?: boolean;
  category: string;
}

export function FactoryHeader({
  name,
  verified,
  category,
}: FactoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          {verified && (
            <Badge variant="secondary" className="h-6">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              已认证
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{category}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button>联系工厂</Button>
      </div>
    </div>
  );
}

export default FactoryHeader