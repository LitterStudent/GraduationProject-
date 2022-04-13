const { Op } = require('sequelize')
const Article = require('../model/article')
const User = require('../model/user')
const Column = require('../model/column')

class ColumnCtl {
    async create(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            description: { type: 'string', required: true },
        })
        const { title, description } = ctx.request.body
        const user_id = ctx.auth.id
        const column = new Column()
        const articleInit = { title, description, user_id }
        column.set(articleInit)
        await column.save()
        ctx.body = column
    }
    async checkColumner(ctx, next) {
        const user_id = ctx.auth.id;
        const column = ctx.state.column
        if(column.user_id!= user_id) { ctx.throw(403, '没有权限') }
        await next();
    }
    async findAll(ctx) {
        let { per_page = 10, page = 1, keyword } = ctx.query
        page = Math.max(page * 1, 1) - 1
        per_page = Math.max(per_page * 1, 1)
        const filter = { status: 1 }
        if (keyword) {
            filter.content = {
                [Op.like]: `%${keyword}%`
            }
        }
        const ColumnList = await Column.findAll({
             where: filter,
             limit: per_page,
             offset: page * per_page,
             order: [
                 ['created_at', 'DESC']
             ]
            })
        ctx.body = ColumnList
    }
    async checkColumnExist(ctx, next) {
        const column = await Column.findByPk(ctx.params.id)
        if (!column || column.status != 1) { ctx.throw(404, '文章不存在')}
        ctx.state.column = column
        await next()
    }
    async findById(ctx) {
        const id = ctx.params.id
        const column = await Column.findByPk(id)
        if (!column || column.status == 0) { ctx.throw(404, '专栏不存在') }
        const user = await User.scope('bh').findByPk(column.user_id)
        const res = article.dataValues
        res.user = user.dataValues
        ctx.body = res
    }
    async findByUserId(ctx) {
        const user_id = ctx.params.id
        const columnList = await Column.findAll({ where: { user_id }})
        ctx.body = columnList
    }
    async updateById(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: false },
            description: { type: 'string', required: false },
        }) 
        const { description, title } = ctx.request.body
        const column = ctx.state.column
        const columnInit = { description, title }
        column.set(columnInit)
        await column.save()
        ctx.body = column
    }
    async deleteArticle(ctx) {
        const column = ctx.state.column
        column.status = 0
        await column.save()
        ctx.status = 204
    }
    // 将文章添加到专栏
    async addingColumn(ctx) {
        const column_id = ctx.params.column_id
        const article = ctx.state.article
        article.column_id = column_id
        await article.save()
        ctx.status = 200
    }
}

module.exports = new ColumnCtl()