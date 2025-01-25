/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'standalone',
  
  // 配置环境变量
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // 配置图片域名白名单
  images: {
    domains: ['vercel.app'],
  },
}

module.exports = nextConfig
