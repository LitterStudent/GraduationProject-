const fs = require('fs')

module.exports = (app) => {
    // const bodyparser = require('koa-bodyparser')
    // app.use(bodyparser())
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js' || file === 'answers.js' ||file === 'home.js'
        ||file === 'questions.js' ||file === 'topics.js' ) { return ;}
        const route = require(`./${file}`)
        // use里面的函数就是中间件 
        // 下面的箭头函数就是中间件
        app.use(route.routes()).use(route.allowedMethods())
    })
}