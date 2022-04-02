const path = require('path')
class Home {
    index(ctx) {
        ctx.body = '这是首页'
    }
    upload(ctx) {
        const file =  ctx.request.files.file
        const baseName = path.basename(file.path)
        ctx.body = { url: `${ctx.origin}/uploads/${baseName}` }
    }
}

module.exports = new Home()