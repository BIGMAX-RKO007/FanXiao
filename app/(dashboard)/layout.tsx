'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* 炫酷固定头部 */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-white/20'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo 区域 - 炫酷动画 */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                {/* 外圈光晕 */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>

                {/* Logo 主体 */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold text-xl">FX</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  FanXiao
                </span>
              </div>
            </Link>

            {/* 导航菜单 - 玻璃形态设计 */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/pricing"
                className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-white/50 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-medium"
              >
                💎 Pricing
              </Link>

              <Link
                href="/dashboard"
                className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-white/50 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-medium"
              >
                🛠️ Dashboard
              </Link>

              {/* 炫酷按钮 */}
              <button className="group relative px-8 py-3 ml-4">
                {/* 按钮光晕 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>

                {/* 按钮主体 */}
                <div className="relative px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300">
                  ✨ Get Started
                </div>
              </button>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-white/20 animate-in slide-in-from-top-4 duration-300">
            <div className="px-4 py-6 space-y-3">
              <Link
                href="/pricing"
                className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-all"
              >
                💎 Pricing
              </Link>
              <Link
                href="/dashboard"
                className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10 rounded-lg transition-all"
              >
                🛠️ Dashboard
              </Link>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold">
                ✨ Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 主要内容 - 添加顶部间距 */}
      <main className="pt-20">
        {children}
      </main>
      {/* 浮动联系按钮 */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="group relative">
          {/* 按钮光晕 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>

          {/* 按钮主体 */}
          <div className="relative flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold shadow-2xl transform group-hover:scale-110 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">Contact Me</span>
          </div>
        </button>
      </div>

      {/* 底部装饰元素 - 可选 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-50"></div>
    </div>
  );
}
