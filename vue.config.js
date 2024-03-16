const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // URL вашего Django сервера
        ws: true,
        changeOrigin: true
      },
    }
  }
};