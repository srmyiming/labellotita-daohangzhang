import React, { useState } from 'react';
import { ZoomIn, Download } from 'lucide-react';
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
            <ZoomIn className="h-4 w-4 mr-2" />
            放大查看
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
      <div className={`${isFullscreen ? 'fixed inset-4 z-50 bg-white p-4 rounded-lg shadow-2xl' : 'relative'}`}>
        {pdfUrl ? (
          <div className={`${isFullscreen ? 'h-full' : 'aspect-[16/9]'}`}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div className="w-full h-full rounded-lg border overflow-hidden">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={1}
                />
              </div>
            </Worker>
          </div>
        ) : (
          <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">暂无产品目录</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}