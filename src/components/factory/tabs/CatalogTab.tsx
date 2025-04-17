import React from 'react';

interface CatalogTabProps {
  // pdfUrl?: string; // 不再需要 pdfUrl
}

// 移除所有 PDF 相关逻辑，只保留一个简单的占位符
const CatalogTab: React.FC<CatalogTabProps> = ({ /* pdfUrl */ }) => {
  return (
    <div className="p-6 text-center text-muted-foreground">
      产品目录内容将在此处显示。
    </div>
  );
};

export default CatalogTab;