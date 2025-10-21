'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QrCode, Download } from 'lucide-react';

export default function QrcodeGenerator() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(200);

  const generateQR = () => {
    if (!text) return;
    // 使用 Google Charts API 生成二维码
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrCode(qrUrl);
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4">
      {/* 输入区域 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          输入文本或链接
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="w-full h-20 px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>

      {/* 尺寸选择 */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          尺寸
        </label>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value={150}>150x150</option>
          <option value={200}>200x200</option>
          <option value={300}>300x300</option>
          <option value={400}>400x400</option>
        </select>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button
          onClick={generateQR}
          disabled={!text}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
        >
          <QrCode className="mr-2 h-4 w-4" />
          生成二维码
        </Button>
        {qrCode && (
          <Button onClick={downloadQR} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            下载
          </Button>
        )}
      </div>

      {/* 二维码显示 */}
      {qrCode && (
        <div className="flex justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-300">
          <img src={qrCode} alt="QR Code" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
