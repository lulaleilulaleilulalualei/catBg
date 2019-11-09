const path = require("path")

module.exports = {
  devServer: {
    port: 8188,
    host: "0.0.0.0",
    // open: true,
    proxy: {
      "/api": {
        target: "http://192.168.199.150:8888",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'less',
        patterns: [path.resolve(__dirname, "src/assets/css/common.less")] // 引入全局样式变量
      }
  }
};
