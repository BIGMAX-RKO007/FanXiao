'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Copy, 
  Check, 
  Pause, 
  Play, 
  RotateCcw, 
  Calendar, 
  Globe, 
  Sparkles,
  Zap
} from 'lucide-react';

type TabType = 'ts2date' | 'date2ts' | 'cheatsheet';

export default function TimestampConverter() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('ts2date');
  const [isLivePaused, setIsLivePaused] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Tab 1: 时间戳转日期
  const [inputTs, setInputTs] = useState<string>('');
  const [tsUnit, setTsUnit] = useState<'auto' | 's' | 'ms'>('auto');

  // Tab 2: 日期转时间戳
  const [inputDate, setInputDate] = useState<string>('');
  const [selectedTimeZone, setSelectedTimeZone] = useState<'local' | 'utc'>('local');

  // 避免 Next.js SSR 水合不一致
  useEffect(() => {
    setMounted(true);
    const now = Date.now();
    setCurrentTime(now);
    setInputTs(Math.floor(now / 1000).toString());
    
    // 初始化日期输入框为当前本地时间 (YYYY-MM-DDTHH:mm:ss)
    const d = new Date(now);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const localIso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    setInputDate(localIso);
  }, []);

  // 实时时钟跳动
  useEffect(() => {
    if (!mounted || isLivePaused) return;
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted, isLivePaused]);

  // 复制辅助函数
  const copyToClipboard = async (text: string | undefined | null, key: string) => {
    if (!text || text === '-' || text.includes('错误')) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // 容错降级
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  // 用户本地时区名称
  const localTimeZoneName = useMemo(() => {
    if (!mounted) return 'UTC';
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'Local';
    }
  }, [mounted]);

  // --- 解析 Tab 1: 时间戳 -> 各种格式 ---
  const parsedTsResult = useMemo(() => {
    if (!inputTs.trim()) {
      return null;
    }
    const cleanStr = inputTs.trim();
    if (!/^-?\d+$/.test(cleanStr)) {
      return { error: '请输入有效的纯数字时间戳' };
    }
    const num = Number(cleanStr);
    let ms = num;
    let detectedUnit: 's' | 'ms' = 's';

    if (tsUnit === 'auto') {
      if (cleanStr.length <= 10 || Math.abs(num) < 100000000000) {
        ms = num * 1000;
        detectedUnit = 's';
      } else {
        detectedUnit = 'ms';
      }
    } else if (tsUnit === 's') {
      ms = num * 1000;
      detectedUnit = 's';
    } else {
      detectedUnit = 'ms';
    }

    const date = new Date(ms);
    if (isNaN(date.getTime())) {
      return { error: '时间戳超出合理范围' };
    }

    const pad = (n: number) => n.toString().padStart(2, '0');
    // 本地时间
    const localStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    // UTC 时间
    const utcStr = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`;
    // ISO 8601
    const isoStr = date.toISOString();

    // 相对时间计算
    const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
    let relativeStr = '';
    if (Math.abs(diffSec) < 5) {
      relativeStr = '刚刚';
    } else if (diffSec > 0) {
      if (diffSec < 60) relativeStr = `${diffSec} 秒前`;
      else if (diffSec < 3600) relativeStr = `${Math.floor(diffSec / 60)} 分钟前`;
      else if (diffSec < 86400) relativeStr = `${Math.floor(diffSec / 3600)} 小时前`;
      else relativeStr = `${Math.floor(diffSec / 86400)} 天前`;
    } else {
      const future = Math.abs(diffSec);
      if (future < 60) relativeStr = `${future} 秒后`;
      else if (future < 3600) relativeStr = `${Math.floor(future / 60)} 分钟后`;
      else if (future < 86400) relativeStr = `${Math.floor(future / 3600)} 小时后`;
      else relativeStr = `${Math.floor(future / 86400)} 天后`;
    }

    return {
      error: null,
      detectedUnit,
      localStr,
      utcStr,
      isoStr,
      relativeStr,
      dayOfWeek: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
    };
  }, [inputTs, tsUnit]);

  // --- 解析 Tab 2: 日期 -> 时间戳 ---
  const parsedDateResult = useMemo(() => {
    if (!inputDate) return null;
    try {
      let date: Date;
      if (selectedTimeZone === 'utc') {
        date = new Date(inputDate + (inputDate.includes('Z') ? '' : 'Z'));
      } else {
        date = new Date(inputDate);
      }
      if (isNaN(date.getTime())) {
        return { error: '请输入正确的日期时间' };
      }
      const ms = date.getTime();
      return {
        error: null,
        sec: Math.floor(ms / 1000).toString(),
        ms: ms.toString(),
        iso: date.toISOString()
      };
    } catch {
      return { error: '日期解析失败' };
    }
  }, [inputDate, selectedTimeZone]);

  // 快捷设置 Tab 2 的时间
  const applyQuickDate = (type: 'now' | 'today_start' | 'today_end' | 'yesterday' | 'tomorrow') => {
    const d = new Date();
    if (type === 'today_start') {
      d.setHours(0, 0, 0, 0);
    } else if (type === 'today_end') {
      d.setHours(23, 59, 59, 999);
    } else if (type === 'yesterday') {
      d.setDate(d.getDate() - 1);
    } else if (type === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    }
    const pad = (n: number) => n.toString().padStart(2, '0');
    const str = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    setInputDate(str);
  };

  if (!mounted) {
    return <div className="p-6 text-center text-sm text-gray-500">加载时间工具中...</div>;
  }

  const currentSec = Math.floor(currentTime / 1000);

  return (
    <div className="w-full space-y-5 text-gray-800 dark:text-gray-100">
      {/* 1. 顶部控制台：实时时钟仪表盘 */}
      <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-orange-200 dark:border-orange-900/40 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLivePaused ? 'bg-amber-400' : 'bg-green-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLivePaused ? 'bg-amber-500' : 'bg-green-500'}`}></span>
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              当前系统时间 ({localTimeZoneName})
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-mono">
              {new Date(currentTime).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => setIsLivePaused(!isLivePaused)}
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs bg-white/80 dark:bg-gray-800/80 hover:bg-white"
            >
              {isLivePaused ? (
                <>
                  <Play className="h-3 w-3 mr-1 text-green-600" />
                  恢复时钟
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3 mr-1 text-amber-600" />
                  暂停时钟
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                const now = Date.now();
                setCurrentTime(now);
                setInputTs(Math.floor(now / 1000).toString());
              }}
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs bg-white/80 dark:bg-gray-800/80 hover:bg-white"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              同步到输入
            </Button>
          </div>
        </div>

        {/* 秒与毫秒时间戳双卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {/* 秒级 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 dark:bg-gray-900/60 border border-orange-100 dark:border-gray-800">
            <div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">10位 Unix 秒时间戳</p>
              <p className="font-mono font-bold text-base text-orange-600 dark:text-orange-400">
                {currentSec}
              </p>
            </div>
            <Button
              onClick={() => copyToClipboard(currentSec.toString(), 'live_sec')}
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 text-xs hover:bg-orange-100 dark:hover:bg-orange-950/50"
            >
              {copiedKey === 'live_sec' ? (
                <span className="text-green-600 flex items-center text-xs">
                  <Check className="h-3.5 w-3.5 mr-1" /> 已复制
                </span>
              ) : (
                <span className="flex items-center text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> 复制
                </span>
              )}
            </Button>
          </div>

          {/* 毫秒级 */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 dark:bg-gray-900/60 border border-orange-100 dark:border-gray-800">
            <div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">13位 毫秒时间戳</p>
              <p className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                {currentTime}
              </p>
            </div>
            <Button
              onClick={() => copyToClipboard(currentTime.toString(), 'live_ms')}
              size="sm"
              variant="ghost"
              className="h-8 px-2.5 text-xs hover:bg-amber-100 dark:hover:bg-amber-950/50"
            >
              {copiedKey === 'live_ms' ? (
                <span className="text-green-600 flex items-center text-xs">
                  <Check className="h-3.5 w-3.5 mr-1" /> 已复制
                </span>
              ) : (
                <span className="flex items-center text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> 复制
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. 标签页切换 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 gap-2">
        <button
          onClick={() => setActiveTab('ts2date')}
          className={`pb-2.5 px-3 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${
            activeTab === 'ts2date'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          时间戳 ➔ 日期时间
        </button>
        <button
          onClick={() => setActiveTab('date2ts')}
          className={`pb-2.5 px-3 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${
            activeTab === 'date2ts'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          日期时间 ➔ 时间戳
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`pb-2.5 px-3 text-sm font-semibold transition-all flex items-center gap-1.5 border-b-2 ${
            activeTab === 'cheatsheet'
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          秒数速查表
        </button>
      </div>

      {/* 3. Tab 内容区 */}

      {/* --- Tab 1: 时间戳转日期 --- */}
      {activeTab === 'ts2date' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                输入时间戳（秒 / 毫秒自动辨识）
              </label>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">单位模式:</span>
                <button
                  onClick={() => setTsUnit('auto')}
                  className={`px-2 py-0.5 rounded ${tsUnit === 'auto' ? 'bg-orange-500 text-white font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  智能识别
                </button>
                <button
                  onClick={() => setTsUnit('s')}
                  className={`px-2 py-0.5 rounded ${tsUnit === 's' ? 'bg-orange-500 text-white font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  强制秒(10位)
                </button>
                <button
                  onClick={() => setTsUnit('ms')}
                  className={`px-2 py-0.5 rounded ${tsUnit === 'ms' ? 'bg-orange-500 text-white font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  强制毫秒(13位)
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputTs}
                onChange={(e) => setInputTs(e.target.value)}
                placeholder="例如: 1732075200 或 1732075200000"
                className="flex-1 px-3.5 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Button
                onClick={() => setInputTs(Math.floor(Date.now() / 1000).toString())}
                variant="outline"
                size="sm"
                className="text-xs whitespace-nowrap"
              >
                当前秒
              </Button>
              <Button
                onClick={() => setInputTs(Date.now().toString())}
                variant="outline"
                size="sm"
                className="text-xs whitespace-nowrap"
              >
                当前毫秒
              </Button>
              <Button
                onClick={() => setInputTs('')}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                清空
              </Button>
            </div>
          </div>

          {/* 转换结果卡片集 */}
          {parsedTsResult?.error ? (
            <div className="p-3 text-xs text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/50">
              ⚠️ {parsedTsResult.error}
            </div>
          ) : parsedTsResult ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                <span>转换结果（自动侦测为: {parsedTsResult.detectedUnit === 's' ? '秒级(10位)' : '毫秒级(13位)'}）</span>
                <span className="text-orange-600 dark:text-orange-400 font-medium">{parsedTsResult.relativeStr}</span>
              </div>

              <div className="grid gap-2">
                {/* 1. 本地时间 */}
                <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 本地时间 ({localTimeZoneName})
                    </span>
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                      {parsedTsResult.localStr} <span className="text-xs font-normal text-gray-400">({parsedTsResult.dayOfWeek})</span>
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(parsedTsResult?.localStr, 'res_local')}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                  >
                    {copiedKey === 'res_local' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400 hover:text-gray-700" />}
                  </Button>
                </div>

                {/* 2. UTC 时间 */}
                <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> UTC 国际标准时间 (GMT)
                    </span>
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                      {parsedTsResult.utcStr}
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(parsedTsResult?.utcStr, 'res_utc')}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                  >
                    {copiedKey === 'res_utc' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400 hover:text-gray-700" />}
                  </Button>
                </div>

                {/* 3. ISO 8601 */}
                <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> ISO 8601 (标准接口传输格式)
                    </span>
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[280px] sm:max-w-none">
                      {parsedTsResult.isoStr}
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(parsedTsResult?.isoStr, 'res_iso')}
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                  >
                    {copiedKey === 'res_iso' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400 hover:text-gray-700" />}
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* --- Tab 2: 日期时间转时间戳 --- */}
      {activeTab === 'date2ts' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                选择或输入日期时间
              </label>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">输入时区:</span>
                <button
                  onClick={() => setSelectedTimeZone('local')}
                  className={`px-2 py-0.5 rounded ${selectedTimeZone === 'local' ? 'bg-orange-500 text-white font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  本地 ({localTimeZoneName})
                </button>
                <button
                  onClick={() => setSelectedTimeZone('utc')}
                  className={`px-2 py-0.5 rounded ${selectedTimeZone === 'utc' ? 'bg-orange-500 text-white font-bold' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  UTC
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="datetime-local"
                step="1"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* 常用快捷填充 */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
              <span className="text-gray-400 self-center mr-1">快捷定位:</span>
              <button
                onClick={() => applyQuickDate('now')}
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                此刻
              </button>
              <button
                onClick={() => applyQuickDate('today_start')}
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                今日 00:00:00
              </button>
              <button
                onClick={() => applyQuickDate('today_end')}
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                今日 23:59:59
              </button>
              <button
                onClick={() => applyQuickDate('yesterday')}
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                昨日同期
              </button>
              <button
                onClick={() => applyQuickDate('tomorrow')}
                className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
              >
                明日同期
              </button>
            </div>
          </div>

          {/* 日期转时间戳结果卡片 */}
          {parsedDateResult?.error ? (
            <div className="p-3 text-xs text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/50">
              ⚠️ {parsedDateResult.error}
            </div>
          ) : parsedDateResult ? (
            <div className="grid gap-2 pt-1">
              {/* 秒级结果 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    秒级时间戳 (10 位 Unix Timestamp)
                  </span>
                  <p className="font-mono text-base font-bold text-orange-600 dark:text-orange-400">
                    {parsedDateResult.sec}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(parsedDateResult?.sec, 'res_sec')}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                >
                  {copiedKey === 'res_sec' ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> 已复制
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Copy className="w-3.5 h-3.5 mr-1" /> 复制秒
                    </span>
                  )}
                </Button>
              </div>

              {/* 毫秒级结果 */}
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    毫秒级时间戳 (13 位 Timestamp)
                  </span>
                  <p className="font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                    {parsedDateResult.ms}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(parsedDateResult?.ms, 'res_ms')}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                >
                  {copiedKey === 'res_ms' ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> 已复制
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Copy className="w-3.5 h-3.5 mr-1" /> 复制毫秒
                    </span>
                  )}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* --- Tab 3: 秒数速查表 --- */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            后端缓存 TTL、Cookie、Token 超时常用秒数一键复制：
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              { label: '1 分钟', sec: '60' },
              { label: '5 分钟', sec: '300' },
              { label: '10 分钟', sec: '600' },
              { label: '30 分钟', sec: '1800' },
              { label: '1 小时', sec: '3600' },
              { label: '2 小时', sec: '7200' },
              { label: '1 天 (24h)', sec: '86400' },
              { label: '3 天', sec: '259200' },
              { label: '7 天 (1周)', sec: '604800' },
              { label: '14 天 (2周)', sec: '1209600' },
              { label: '30 天 (1月)', sec: '2592000' },
              { label: '365 天 (1年)', sec: '31536000' }
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => copyToClipboard(item.sec, `cheat_${item.label}`)}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-orange-50 dark:bg-gray-800/60 dark:hover:bg-orange-950/30 border border-gray-200 dark:border-gray-700 cursor-pointer transition"
              >
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{item.label}</div>
                  <div className="font-mono text-orange-600 dark:text-orange-400 font-semibold">{item.sec}s</div>
                </div>
                {copiedKey === `cheat_${item.label}` ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
