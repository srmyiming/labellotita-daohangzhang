import React, { useState } from 'react';
import { ZoomIn, Download, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface CatalogTabProps {
  pdfUrl?: string;
}

export default function CatalogTab({ pdfUrl }: CatalogTabProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">产品目录</h2>
        <div className="flex items-center space-x-4">
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(pdfUrl, '_blank')}
            disabled={!pdfUrl}
          >
            <Download className="h-4 w-4 mr-2" />
            下载PDF
          </Button>
        </div>
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
        
        {pdfUrl ? (
          <div className={`
            ${isFullscreen ? 'h-screen p-4' : 'h-[600px]'}
            transition-all duration-300
          `}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div className="w-full h-full rounded-lg border overflow-hidden bg-white shadow-sm">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={1}
                />
              </div>
            </Worker>
          </div>
        ) : (
          <div className="h-[600px] bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">暂无产品目录</p>
              <p className="text-sm text-gray-400">制造商尚未上传PDF产品目录</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}