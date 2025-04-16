import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { Button } from '../../ui/button';

interface CatalogTabProps {
  pdfUrl?: string;
}

export default function CatalogTab({ pdfUrl = 'https://drive.google.com/file/d/1V2yO8rkQGj83jaZn47H6C0LI8l86R9TT/view?usp=drive_link' }: CatalogTabProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 转换 Google Drive 链接为嵌入链接
  const embedUrl = pdfUrl.replace(
    'https://drive.google.com/file/d/',
    'https://drive.google.com/file/d/'
  ).replace('/view?usp=drive_link', '/preview');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">产品目录</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? (
            <>
              <X className="h-4 w-4 mr-2" />
              退出全屏
            </>
          ) : (
            <>
              <ZoomIn className="h-4 w-4 mr-2" />
              全屏查看
            </>
          )}
        </Button>
      </div>
      
      <div className={`
        ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'} 
        transition-all duration-300
      `}>
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-4 w-4 mr-2" />
              关闭
            </Button>
          </div>
        )}
        
        <div className={`
          ${isFullscreen ? 'h-screen p-4' : 'h-[600px]'}
          transition-all duration-300
        `}>
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg border-0 bg-white shadow-sm"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}