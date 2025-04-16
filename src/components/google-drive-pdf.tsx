import React from 'react';

interface GoogleDrivePDFProps {
  pdfId: string;
  fileName?: string;
  height?: string;
}

export default function GoogleDrivePDF({ pdfId, fileName, height = "500px" }: GoogleDrivePDFProps) {
  const url = `https://drive.google.com/file/d/${pdfId}/preview`;
  
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src={url}
        width="100%"
        height={height}
        allow="autoplay"
        className="bg-white"
      ></iframe>
      {fileName && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">{fileName}</p>
        </div>
      )}
    </div>
  );
}