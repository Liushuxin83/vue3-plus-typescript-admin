module.exports = {
  // 跨域
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null,
    proxy: {
      '/devApi': {
        target: 'http://www.web-jshtml.cn/productapi',
        changeOrigin: true
      }
    }
  }
}
