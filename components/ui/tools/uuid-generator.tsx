'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
    setCopied(null);
  };

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 生成控制 */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            生成数量
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="pt-7">
          <Button
            onClick={generateUUIDs}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            生成 UUID
          </Button>
        </div>
      </div>

      {/* UUID 列表 */}
      {uuids.length > 0 && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成结果
            </label>
            {uuids.length > 1 && (
              <Button onClick={copyAll} size="sm" variant="outline">
                {copied === -1 ? (
                  <>
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">已复制全部</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    复制全部
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <code className="text-sm font-mono text-gray-800 dark:text-gray-100 flex-1">
                  {uuid}
                </code>
                <Button
                  onClick={() => copyToClipboard(uuid, index)}
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied === index ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
