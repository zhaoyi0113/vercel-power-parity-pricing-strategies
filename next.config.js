module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/edge',
        permanent: false,
      },
      {
        source: '/edge/product/:id',
        destination: '/product/:id',
        permanent: false,
      },
    ]
  },
  experimental: {
    appDir: true,
  },
}
