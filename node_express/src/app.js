const express = require('express')
const cors = require("cors");
const indexRouter = require('./routers/index')
const testRouter = require('./routers/test')
const bookRouter = require('./routers/book')

const app = express();

// 静态资源处理
app.use(express.static('public'))

app.use(cors())

// 处理跨域全局中间件
// app.use(function (req, res, next) {
//     // req:表示请求对象
//     // res:表示响应对象
//     // next:表示下一步
//     // *：通配符
//     res.setHeader('Access-Control-Allow-Origin', '*')//允许哪些域名请求我
//     res.setHeader('Access-Control-Request-Methods', 'GET,POST,PUT,DELETE,OPTIONS')//允许哪些请求方式可以请求我
//     res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')//允许携带哪些请求头信息
//     next()
// })

// 注册路由模块
app.use(indexRouter);
app.use(testRouter);
app.use(bookRouter);

app.listen(5501, () => {
    console.log(5501);
})