'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GitCompare } from 'lucide-react';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const calculateDiff = () => {
    setShowDiff(true);
  };

  const getDiffLines = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);
    
    const diffs = [];
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        diffs.push({ type: 'same', line1, line2, lineNum: i + 1 });
      } else if (!line1) {
        diffs.push({ type: 'added', line1: '', line2, lineNum: i + 1 });
      } else if (!line2) {
        diffs.push({ type: 'removed', line1, line2: '', lineNum: i + 1 });
      } else {
        diffs.push({ type: 'modified', line1, line2, lineNum: i + 1 });
      }
    }
    
    return diffs;
  };

  const clearAll = () => {
    setText1('');
    setText2('');
    setShowDiff(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* 对比文本输入 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            原始文本
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="输入原始文本..."
            className="w-full h-48 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            对比文本
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="输入对比文本..."
            className="w-full h-48 px-4 py-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button
          onClick={calculateDiff}
          disabled={!text1 || !text2}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        >
          <GitCompare className="mr-2 h-4 w-4" />
          对比差异
        </Button>
        <Button onClick={clearAll} variant="outline">
          清空
        </Button>
      </div>

      {/* 差异显示 */}
      {showDiff && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            差异结果
          </label>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {getDiffLines().map((diff, index) => (
                <div 
                  key={index}
                  className={`grid grid-cols-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                    diff.type === 'same' ? 'bg-white dark:bg-gray-800' :
                    diff.type === 'added' ? 'bg-green-50 dark:bg-green-900/20' :
                    diff.type === 'removed' ? 'bg-red-50 dark:bg-red-900/20' :
                    'bg-yellow-50 dark:bg-yellow-900/20'
                  }`}
                >
                  <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400 w-8">{diff.line1 ? diff.lineNum : ''}</span>
                      <span className={`text-xs w-4 ${
                        diff.type === 'removed' ? 'text-red-600' :
                        diff.type === 'modified' ? 'text-yellow-600' : ''
                      }`}>
                        {diff.type === 'removed' ? '-' : diff.type === 'modified' ? '~' : ''}
                      </span>
                      <code className="text-sm font-mono flex-1">{diff.line1}</code>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400 w-8">{diff.line2 ? diff.lineNum : ''}</span>
                      <span className={`text-xs w-4 ${
                        diff.type === 'added' ? 'text-green-600' :
                        diff.type === 'modified' ? 'text-yellow-600' : ''
                      }`}>
                        {diff.type === 'added' ? '+' : diff.type === 'modified' ? '~' : ''}
                      </span>
                      <code className="text-sm font-mono flex-1">{diff.line2}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 统计信息 */}
          <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded"></span>
              新增行
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-200 dark:bg-red-800 rounded"></span>
              删除行
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-200 dark:bg-yellow-800 rounded"></span>
              修改行
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
