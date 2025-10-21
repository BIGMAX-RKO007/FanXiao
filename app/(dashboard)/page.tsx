import { Button } from '@/components/ui/button';
import ContactMe from '@/components/ui/contact-me';
import   GeneratePasswordButton from '@/components/ui/generate-password-button';

import { 
  BookOpen,      // 📖 书籍 - 诗歌/文学
  Clapperboard,  // 🎬 电影板 - 导演梦想
  Heart,         // 💖 爱心 - 浪漫主义
  ArrowRight
} from 'lucide-react';
import { Terminal } from './terminal';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                欢迎来到我的网站
                <span className="block text-orange-500">你今天开心吗？</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                下面的小工具请体验一下吧
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                {/* <a
                  href="https://vercel.com/templates/next.js/next-js-saas-starter"
                  target="_blank"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg rounded-full"
                  >
                    这是一个跳转连接
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a> */}
                <GeneratePasswordButton />
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                {/* <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg> */}
                <Heart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                樊宵
                </h2>
                <p className="mt-2 text-base text-gray-500">
                时代浪漫主义诗人 • 作家 • 学者
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-lg">
                    <span className="text-amber-300">⚽</span> 足球巨星不是梦
                  </div>
                  <div className="text-lg">
                    <span className="text-emerald-300">🎬</span> 未来导演是行动
                  </div>
                  <div className="text-lg">
                    <span className="text-rose-300">✍️</span> 浪漫主义实践者
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Clapperboard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                探索我的世界
                </h2>
                <p className="mt-2 text-base text-gray-500">
                在时代浪潮中，追寻诗意的足球，在光影之间，书写浪漫的导演梦
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                阅读诗集
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Seamless payment processing and subscription management with
                  industry-leading Stripe integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              诗是流动的光影，梦是无尽的绿茵。
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
              这里是我的个人诗歌集与梦想日志——时代浪漫主义的片段与隽语，亦或足球场上的奔跑和电影镜头下的故事。
              </p>
            </div>
            {/* <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="https://github.com/nextjs/saas-starter" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg rounded-full"
                >
                  联系我
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div> */}
            <ContactMe />
          </div>
        </div>
      </section>
    </main>
  );
}
