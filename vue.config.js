// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
//   lintOnSave : false
// })
module.exports = {
  // 关闭eslint校验工具
  lintOnSave: false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},
      },
      // '/qinghua':{
      //   target:'https://api.uomg.com',
      //   // pathRewrite:{"^/qinghua":''},
      //   // changeOrigin:true
      // }
    }
  }
}