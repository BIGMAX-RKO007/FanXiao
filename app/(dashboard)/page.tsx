import ContactMe from '@/components/ui/contact-me';
import ToolsPanel from '@/components/ui/tools/tools-panel';
import Link from 'next/link';
import Terminal from './terminal';

export default function HomePage() {
  return (
    <div className="relative">
      {/* 背景装饰元素 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 渐变球体1 */}
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        
        {/* 渐变球体2 */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Hero 区域 */}
      <section className="relative px-4 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左侧文字区域 */}
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              {/* 欢迎标签 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🎉 26 个超实用工具等你体验
                </span>
              </div>

              {/* 主标题 */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-black leading-tight">
                  <span className="block text-gray-900 dark:text-white">
                    欢迎来到
                  </span>
                  <span className="block text-gray-900 dark:text-white">
                    我的网站
                  </span>
                  <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    你今天开心吗？
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  下面的小工具请体验一下吧 ✨
                  <br />
                  <span className="text-sm">从密码生成到代码片段，应有尽有</span>
                </p>
              </div>

              {/* CTA 按钮组 */}
              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-2 text-white font-bold text-lg">
                    🚀 开始使用
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  📊 查看 Dashboard
                </Link>
              </div>

              {/* 统计数据 */}
              <div className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    26+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">实用工具</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    150+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">快捷命令</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                    7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">支持平台</div>
                </div>
              </div>
            </div>

            {/* 右侧代码窗口 */}
            <div className="relative animate-in slide-in-from-right duration-700 delay-150">
              {/* 装饰光晕 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
              
              {/* 代码窗口主体 */}
              <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
                <Terminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具面板区域 */}
      <section className="relative px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <ToolsPanel>
            {/* 工具内容 */}
          </ToolsPanel>
        </div>
      </section>

      {/* 🆕 炫酷的 Contact Me 区域 */}
      <section className="relative px-4 py-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
        
        {/* 装饰圆圈 */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧：标题和描述 */}
            <div className="space-y-6 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <span className="text-2xl">👋</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  让我们聊聊
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="block text-gray-900 dark:text-white">
                  有想法？
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  联系我吧！
                </span>
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                无论是技术合作、项目咨询，还是简单的问候，
                <br />
                我都很乐意与你交流 ✨
              </p>

              {/* 社交媒体链接 */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://line.me/ti/p/fanxiao.line"  // 👈 替换为你的 LINE ID
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {/* LINE 官方图标 SVG */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  <span className="font-medium">LINE</span>
                </a>
                <a
                  href="https://x.com/fnpix8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span className="font-medium">Twitter</span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=fx369246926@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Email</span>
              </a>

              </div>
            </div>

            {/* 右侧：ContactMe 组件 */}
            <div className="animate-in slide-in-from-right duration-700 delay-150">
              <div className="relative">
                {/* 装饰光晕 */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20"></div>
                
                {/* ContactMe 卡片 */}
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <ContactMe />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="relative px-4 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 FanXiao. Made with ❤️ and ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
