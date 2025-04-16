import React from 'react';
import { Factory } from '../../../types';
import { PurchaseServiceCard } from '../../PurchaseServiceCard';
import { FactoryContactCard } from '../FactoryContactCard';

interface FactoryDetailSidebarProps {
  factory: Factory;
}

export function FactoryDetailSidebar({ factory }: FactoryDetailSidebarProps) {
  return (
    <div className="w-full lg:w-[360px] space-y-6">
      <FactoryContactCard 
        phone={factory.phone}
        email={factory.email}
        website={factory.website}
      />
      <PurchaseServiceCard />
    </div>
  );
}