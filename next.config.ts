// next.config.js
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:1997'

module.exports = {
  async rewrites() {
    return [
      {
        source: '/c/:path*',
        destination: `${BACKEND_URL}/c/:path*`,
      },
      {
        source: '/1/:path*',
        destination: `${BACKEND_URL}/1/:path*`,
      },
    ]
  },
}