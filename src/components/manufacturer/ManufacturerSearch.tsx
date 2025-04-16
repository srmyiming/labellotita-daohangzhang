import React from 'react';
import { Search } from 'lucide-react';

interface ManufacturerSearchProps {
  value: string;
  onChange: (term: string) => void;
}

export default function ManufacturerSearch({ value, onChange }: ManufacturerSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="搜索制造商名称或产品..."
        className="w-full pl-12 pr-4 h-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm hover:shadow transition-shadow"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}