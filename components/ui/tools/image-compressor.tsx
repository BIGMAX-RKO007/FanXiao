'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, ImageDown, X } from 'lucide-react';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setCompressedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setCompressedSize(blob.size);
          const reader = new FileReader();
          reader.onload = (e) => {
            setCompressedImage(e.target?.result as string);
          };
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        quality
      );
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* 上传区域 */}
      {!originalImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            点击上传图片
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            支持 JPG, PNG 格式
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <>
          {/* 质量滑块 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                压缩质量
              </label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button
              onClick={compressImage}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <ImageDown className="mr-2 h-4 w-4" />
              压缩图片
            </Button>
            {compressedImage && (
              <Button onClick={downloadImage} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                下载
              </Button>
            )}
            <Button onClick={reset} variant="outline">
              <X className="mr-2 h-4 w-4" />
              重置
            </Button>
          </div>

          {/* 图片对比 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 原始图片 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  原始图片
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(originalSize)}
                </span>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            {/* 压缩后图片 */}
            {compressedImage && (
              <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    压缩后
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(compressedSize)}
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      减少 {Math.round((1 - compressedSize / originalSize) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
                  <img
                    src={compressedImage}
                    alt="Compressed"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
