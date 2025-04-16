import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Factory } from '../types';
import { staticFactoryData } from '../data';
import FactoryDetail from '../components/factory/FactoryDetail';
import { useNavigate } from 'react-router-dom';

export default function StaticFactoryDetail() {
  const navigate = useNavigate();

  // 创建一个静态工厂对象，包含所有需要显示的数据
  const staticFactory: Factory = {
    id: 'static-factory-id',
    name: 'Quesos La Mancha',
    category: 'c2b6c3a2-1234-5678-90ab-cdef12345678',
    description: staticFactoryData.description,
    address: '拉曼恰，西班牙',
    city: '拉曼恰',
    region: 'castilla',
    phone: '+34 926 234 567',
    email: 'info@quesoslamancha.es',
    website: 'www.quesoslamancha.es',
    products: ['曼彻格奶酪', '羊奶奶酪', '山羊奶酪'],
    verified: true,
    productCount: 10,
    rating: 4.7,
    manufacturer_tags: staticFactoryData.manufacturer_tags,
    manufacturer_certifications: staticFactoryData.manufacturer_certifications,
    founded_year: staticFactoryData.foundedYear,
    employee_count: staticFactoryData.employeeCount,
    annual_production: staticFactoryData.annualProduction,
    daily_production: staticFactoryData.dailyProduction,
    storage_capacity: staticFactoryData.storageCapacity,
    production_lines: staticFactoryData.productionLines,
    updated_at: staticFactoryData.updatedAt,
    manufacturer_export_countries: staticFactoryData.manufacturer_export_countries,
    factoryImages: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554296143-5e522db6b52f?w=800&auto=format&fit=crop',
    ],
    catalog_pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      <FactoryDetail 
        factory={staticFactory} 
        onBack={() => navigate('/')} 
        loading={false}
      />
      <Footer />
    </div>
  );
}