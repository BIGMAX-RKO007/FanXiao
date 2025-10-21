'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Palette } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : '';
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <div className="w-full space-y-4">
      {/* 颜色预览和选择器 */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-20 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700"
          />
          <Palette className="absolute bottom-1 right-1 h-4 w-4 text-white pointer-events-none" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-4 py-2 text-lg font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* 色值展示 */}
      <div className="space-y-3">
        {/* HEX */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">HEX</span>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-100">{color.toUpperCase()}</p>
          </div>
          <Button
            onClick={() => copyToClipboard(color, 'hex')}
            variant="ghost"
            size="sm"
          >
            {copied === 'hex' ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* RGB */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">RGB</span>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-100">{rgb}</p>
          </div>
          <Button
            onClick={() => copyToClipboard(rgb, 'rgb')}
            variant="ghost"
            size="sm"
          >
            {copied === 'rgb' ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* HSL */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">HSL</span>
            <p className="font-mono text-sm font-medium text-gray-800 dark:text-gray-100">{hsl}</p>
          </div>
          <Button
            onClick={() => copyToClipboard(hsl, 'hsl')}
            variant="ghost"
            size="sm"
          >
            {copied === 'hsl' ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
