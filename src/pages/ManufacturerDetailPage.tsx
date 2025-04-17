import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FactoryDetail from '../components/FactoryDetail';
// import FactoryLocation from '../components/FactoryLocation';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import { Factory } from '../types';
import { manufacturersApi } from '../lib/supabase';
import { toast } from 'sonner';
import { staticFactoryData } from '../data';

export default function ManufacturerDetailPage() {
  const { id } = useParams();
  const [factory, setFactory] = useState<Factory | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [useStaticData, setUseStaticData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFactory = async () => {
      if (!id) {
        setUseStaticData(true);
        return;
      }
      
      try {
        setLoading(true);
        const rawData = await manufacturersApi.getById(id);
        
        // Process images
        const factoryImages = rawData.manufacturer_images
          ?.filter((img: { type: string; }) => img.type === 'factory')
          .sort((a: { order?: number | null }, b: { order?: number | null }) => (a.order ?? 0) - (b.order ?? 0))
          .map((img: { url: string; }) => img.url) ?? [];

        // Construct the final factory object
        const processedData: Factory = {
          ...rawData,
          factoryImages: factoryImages,
        };
        
        console.log('获取并处理后的工厂数据:', processedData); // Log processed data
        setFactory(processedData);
      } catch (error) {
        console.error('获取工厂数据失败:', error);
        toast.error('获取制造商信息失败');
        setUseStaticData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFactory();
  }, [id]);

  useEffect(() => {
    if (useStaticData) {
      setLoading(false);
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
          'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=800&auto=format&fit=crop',
        ],
        catalog_pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      };
      setFactory(staticFactory);
    }
  }, [useStaticData]);

  useEffect(() => {
    if (factory) {
      console.log('工厂数据更新:', {
        生产能力是否存在: {
          annual_production: !!factory.annual_production,
          daily_production: !!factory.daily_production,
          storage_capacity: !!factory.storage_capacity,
          production_lines: !!factory.production_lines,
        },
        认证信息是否存在: !!factory.manufacturer_certifications,
        认证数量: factory.manufacturer_certifications?.length,
        出口国家是否存在: !!factory.manufacturer_export_countries,
        出口国家数量: factory.manufacturer_export_countries?.length,
      });
    }
  }, [factory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <FactoryDetail 
          factory={factory} 
          onBack={() => window.history.back()} 
          loading={loading}
        />
      </div>
    </div>
  );
}