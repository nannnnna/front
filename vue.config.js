const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    client: {
           webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    proxy: {
      '/api': {
        target: 'https://apidemo.besi.sh',
        pathRewrite: { '^/api': '' },
        
        changeOrigin: true
      },
    }
  }
};