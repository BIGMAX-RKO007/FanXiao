'use client';

import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const messages = [
    { text: '$ 樊宵・时代浪漫主义诗人', color: 'text-green-400', delay: 100 },
    { text: '$ 作家及学者', color: 'text-blue-400', delay: 80 },
    { text: '$ 光影幸福人生', color: 'text-cyan-400', delay: 90 },
    { text: '$ 浏览主义的自由与希望', color: 'text-yellow-400', delay: 85 },
    { text: '$ 诗，定格浪漫的瞬间', color: 'text-pink-400', delay: 95 },
    { text: '$ 一盏灯，照亮世界 ✨', color: 'text-purple-400', delay: 100 },
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let typingTimeout: NodeJS.Timeout;

    const typeCharacter = () => {
      if (lineIndex < messages.length) {
        const currentMessage = messages[lineIndex];
        
        if (charIndex < currentMessage.text.length) {
          setCurrentLine(currentMessage.text.slice(0, charIndex + 1));
          setIsTyping(true);
          charIndex++;
          typingTimeout = setTimeout(typeCharacter, currentMessage.delay);
        } else {
          // 完成当前行
          setLines(prev => [...prev, currentMessage.text]);
          setCurrentLine('');
          setIsTyping(false);
          lineIndex++;
          charIndex = 0;
          
          // 等待一下再打下一行
          typingTimeout = setTimeout(typeCharacter, 500);
        }
      } else {
        // 所有行打完后，重新开始
        setTimeout(() => {
          setLines([]);
          setCurrentLine('');
          lineIndex = 0;
          charIndex = 0;
          typeCharacter();
        }, 3000);
      }
    };

    typeCharacter();

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <div className="relative group">
      {/* 外层装饰光晕 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-cyan-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      {/* 终端主体 */}
      <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800 transform group-hover:scale-[1.02] transition-all duration-500">
        {/* 终端标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 backdrop-blur-sm">
          {/* 窗口控制按钮 */}
          <div className="flex gap-2">
            <button className="group/btn relative w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover/btn:opacity-100 transition-opacity">×</span>
            </button>
            <button className="group/btn relative w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover/btn:opacity-100 transition-opacity">−</span>
            </button>
            <button className="group/btn relative w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-green-900 opacity-0 group-hover/btn:opacity-100 transition-opacity">+</span>
            </button>
          </div>

          {/* 终端标题 */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <div className="flex items-center gap-2 px-4 py-1 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <svg className="w-4 h-4 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="3"/>
              </svg>
              <span className="text-sm text-gray-400 font-mono">terminal.tsx</span>
            </div>
          </div>

          {/* 右侧按钮 */}
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 终端内容区域 */}
        <div 
          ref={terminalRef}
          className="p-6 h-80 overflow-y-auto font-mono text-sm space-y-3 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {/* 欢迎信息 */}
          <div className="mb-4 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-bold">FanXiao Terminal v2.0</span>
            </div>
            <div className="text-gray-500 text-xs space-y-1">
              <p>Welcome to the developer toolbox!</p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System ready
              </p>
            </div>
          </div>

          {/* 打字机效果的行 */}
          {lines.map((line, index) => {
            const message = messages[index];
            return (
              <div 
                key={index} 
                className={`flex items-start gap-3 ${message?.color || 'text-green-400'} animate-in slide-in-from-left duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-purple-400 font-bold">➜</span>
                <span className="flex-1">{line}</span>
                {/* <span className="text-gray-600 text-xs">
                  {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span> */}
              </div>
            );
          })}

          {/* 当前正在输入的行 */}
          {currentLine && (
            <div className={`flex items-start gap-3 ${messages[lines.length]?.color || 'text-green-400'}`}>
              <span className="text-purple-400 font-bold">➜</span>
              <span className="flex-1">{currentLine}</span>
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
              )}
            </div>
          )}

          {/* 输入提示符（当所有行都打完时显示） */}
          {!isTyping && lines.length === messages.length && (
            <div className="flex items-center gap-3 text-gray-500 animate-pulse">
              <span className="text-purple-400 font-bold">➜</span>
              <span>_</span>
            </div>
          )}
        </div>

        {/* 底部状态栏 */}
        <div className="flex items-center justify-between px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8"/>
              </svg>
              <span>main</span>
            </div>
            <div className="text-gray-500">
              {lines.length}/{messages.length} lines
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500">
            <span>UTF-8</span>
            <span>Bash</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
