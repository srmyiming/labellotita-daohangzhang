import React from 'react';
import { Factory } from '../../../types';
import { BreadcrumbNav } from '../BreadcrumbNav';
import { FactoryHeader } from '../FactoryHeader';

interface FactoryDetailHeaderProps {
  factory: Factory;
  onBack: () => void;
}

export function FactoryDetailHeader({ factory, onBack }: FactoryDetailHeaderProps) {
  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <BreadcrumbNav factoryName={factory.name} onBack={onBack} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FactoryHeader 
          name={factory.name}
          address={factory.address}
          verified={factory.verified}
          category={factory.category}
        />
      </div>
    </div>
  );
}