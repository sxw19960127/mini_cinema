// 反向代理的配置,解决跨域问题

module.exports = {
    publicPath: '/miaomiao',
    devServer: {
        proxy: {
            '/api2': { // 代理本地的接口要放在比较上面一点
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '/api': {
               target: 'http://39.97.33.178',
               changeOrigin: true
            }
        }    
    }
}