const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            '/api',
            {
                // 遇见‘/api’这个前缀的请求，就会触发这个代理
                target: 'http://192.168.3.11:5000', // 请求转发的目标（target）地址
                changeOrigin: true, // 默认值为false，控制服务器收到的请求头中Host字段的值
                /*
                  changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
                  changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
                  changeOrigin默认值为false，但我们一般将changeOrigin值设为true
                */
                pathRewrite: {
                    '^/api': '/api'
                },
                // 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
            }
        ),
        // 可配置多个代理
        createProxyMiddleware(
            // 如果配置 api2 则会先触发 /api 的代理
            '/2api',
            {
                target: 'http://192.168.3.11:6000',
                changeOrigin: true,
                pathRewrite: {
                    '^/2api': ''
                }
            }
        )
    )
}
