'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = parseInt(timestamp);
      const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
      setDatetime(date.toLocaleString('zh-CN', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    } catch (e) {
      setDatetime('转换失败');
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(datetime);
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (e) {
      setTimestamp('转换失败');
    }
  };

  const useCurrentTime = () => {
    const now = Date.now();
    setTimestamp(Math.floor(now / 1000).toString());
    setDatetime(new Date(now).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }));
  };

  return (
    <div className="w-full space-y-4">
      {/* 当前时间显示 */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">当前时间戳</p>
            <p className="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
              {Math.floor(currentTime / 1000)}
            </p>
          </div>
          <Button onClick={useCurrentTime} size="sm" variant="outline">
            <Clock className="h-4 w-4 mr-1" />
            使用
          </Button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          {new Date(currentTime).toLocaleString('zh-CN', { hour12: false })}
        </p>
      </div>

      {/* 时间戳转日期 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          时间戳（秒）
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="输入时间戳..."
            className="flex-1 px-4 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Button
            onClick={timestampToDate}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            转换
          </Button>
        </div>
      </div>

      {/* 日期转时间戳 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          日期时间
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            placeholder="YYYY-MM-DD HH:mm:ss"
            className="flex-1 px-4 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Button
            onClick={dateToTimestamp}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            转换
          </Button>
        </div>
      </div>
    </div>
  );
}
