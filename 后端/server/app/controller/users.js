const  User =   require('../model/user')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
class Users {
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限') }
        await next()
    }
    async findAll(ctx) {
        // select 可以让select为false 的字段显示出来
        // ctx.body = await User.find().select('password').select('name')
        // const { fileds } = ctx.query || []
        // const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
        ctx.body = await User.find()
    }
    async findById(ctx) {
        const { fileds } = ctx.query
        // if (!fileds) { fileds = []} 
        const selectFileds = fileds.split(';').filter(f => f).map(f => ' +' + f).join('')
        const user = await User.findById(ctx.params.id).select(selectFileds)
        if(!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }
    async updateById(ctx) {
        ctx.verifyParams({
            name: { type:  'string', required: false },
            password: { type: 'string', required: false },
            avator_url: { type: 'string', required: false},
            gender: { type: 'string', required: false},
            headline: { type: 'string', required: false},
            location: { type: 'array', itemType: 'string', required: false},
            employments: { type: 'array', itemType: 'object', required: false },
            educations: { type: 'array', itemType: 'object', required: false}
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }
    async deleteById(ctx) {

        const user = await User.findByIdAndRemove(ctx.params.id)
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.status = 204
    }
    async create(ctx) {
        ctx.verifyParams({
            name: { type:  'string', required: true },
            password: { type: 'string', required: true }  
        });
        const { name } = ctx.request.body
        const repeateUser = await User.findOne({ name })
        if( repeateUser ) { ctx.throw(409, '用户已经占用')}
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async login (ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })
        const user = await User.findOne(ctx.request.body)
        if(!user) { ctx.throw(401, '用户名或者密码不正确')}
        const { _id, name } = user
        const token = jsonwebtoken.sign({_id, name}, secret, { expiresIn: '1d'})
        ctx.body = {token : token}
    }


}

module.exports = new Users()