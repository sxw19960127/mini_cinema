// 反向代理的配置,解决跨域问题

module.exports = {
    publicPath: '/miaomiao',
   devServer: {
       proxy: {
           '/api': {
               target: 'http://39.97.33.178',
               changeOrigin: true
           }
       }
   }
}