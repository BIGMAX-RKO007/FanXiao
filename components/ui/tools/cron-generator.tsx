'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Clock } from 'lucide-react';

export default function CronGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [expression, setExpression] = useState('');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;
    setExpression(cron);
    setDescription(describeCron(cron));
  }, [minute, hour, day, month, weekday]);

  const describeCron = (cron: string): string => {
    const [m, h, d, mo, w] = cron.split(' ');
    
    let desc = '执行时间: ';
    
    // 分钟
    if (m === '*') desc += '每分钟';
    else if (m.includes('/')) desc += `每 ${m.split('/')[1]} 分钟`;
    else desc += `第 ${m} 分钟`;
    
    desc += ', ';
    
    // 小时
    if (h === '*') desc += '每小时';
    else if (h.includes('/')) desc += `每 ${h.split('/')[1]} 小时`;
    else desc += `${h} 点`;
    
    desc += ', ';
    
    // 日
    if (d === '*') desc += '每天';
    else if (d.includes('/')) desc += `每 ${d.split('/')[1]} 天`;
    else desc += `每月 ${d} 号`;
    
    desc += ', ';
    
    // 月
    if (mo === '*') desc += '每月';
    else desc += `${mo} 月`;
    
    desc += ', ';
    
    // 星期
    if (w === '*') desc += '每周';
    else {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      desc += days[parseInt(w)] || `周 ${w}`;
    }
    
    return desc;
  };

  const setPreset = (preset: string) => {
    switch (preset) {
      case 'everyMinute':
        setMinute('*'); setHour('*'); setDay('*'); setMonth('*'); setWeekday('*');
        break;
      case 'everyHour':
        setMinute('0'); setHour('*'); setDay('*'); setMonth('*'); setWeekday('*');
        break;
      case 'everyDay':
        setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('*');
        break;
      case 'everyWeek':
        setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('0');
        break;
      case 'everyMonth':
        setMinute('0'); setHour('0'); setDay('1'); setMonth('*'); setWeekday('*');
        break;
      case 'workdays':
        setMinute('0'); setHour('9'); setDay('*'); setMonth('*'); setWeekday('1-5');
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* 快捷预设 */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'everyMinute', label: '每分钟' },
          { value: 'everyHour', label: '每小时' },
          { value: 'everyDay', label: '每天' },
          { value: 'everyWeek', label: '每周' },
          { value: 'everyMonth', label: '每月' },
          { value: 'workdays', label: '工作日' }
        ].map((preset) => (
          <Button
            key={preset.value}
            onClick={() => setPreset(preset.value)}
            variant="outline"
            size="sm"
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Cron 字段输入 */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            分钟 (0-59)
          </label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            小时 (0-23)
          </label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            日 (1-31)
          </label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            月 (1-12)
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            星期 (0-6)
          </label>
          <input
            type="text"
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* 提示 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        <p><strong>特殊字符：</strong></p>
        <p>* = 任意值 | , = 多个值 | - = 范围 | / = 步长</p>
        <p>示例: */15 = 每15分钟, 1-5 = 周一到周五</p>
      </div>

      {/* Cron 表达式显示 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Cron 表达式
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <code className="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
              {expression}
            </code>
          </div>
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 描述 */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-2">
          <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              执行说明
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
