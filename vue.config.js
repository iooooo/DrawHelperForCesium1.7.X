module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/resource': {
        changeOrigin:true,
        target: 'http://localhost:8888',
        pathRewrite: {
          ['^' + '/resource']: ''
        }
       },
       '/img_w':{
        changeOrigin:true,
        target: 'http://t0.tianditu.com',
        // pathRewrite: {
        //   ['^' + '/resource']: ''
        // }
       },
       '/maps':{
        target: 'http://www.google.cn'
       }
    },
    disableHostCheck: true
  },

}
