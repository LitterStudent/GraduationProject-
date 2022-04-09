const Koa =  require('koa')
const path = require('path');
const app = new Koa();
// 错误报文格式设置, 开发 和 生产模式
const error = require('koa-json-error');
// 校验参数 ctx.verifyParams()
const parameter = require('koa-parameter')
// 路由
const routing = require('./route')
// 数据库
// const mongoose = require('mongoose')
// 解析请求报文的内容 
const koaBody = require('koa-body')
// 静态资源
const koaStatic = require('koa-static')

// const { connectStr } = require('./config');


// mongoose.connect(connectStr, { useNewUrlParser: true }, () => {
//     console.log('连接数据库成功')
// })
// mongoose.connection.on('error', console.error)

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest}
}))
app.use(koaBody({
    // 支持文件上传
    multipart: true,
    // 一个npm包,koaBody内部引用了这个包
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        // 保留扩展名 .jpg . gif
        keepExtensions: true
    }
}))
app.use(parameter(app))
routing(app)

app.listen(3000, () => {
    console.log("服务器运行在3000端口成功");
})