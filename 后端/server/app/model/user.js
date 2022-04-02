const mongoose = require('mongoose')

const { Schema, model }  = mongoose

const  userSchema = new Schema({
    // select: false 隐藏这个字段
    __v: {type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, require: true, select: false},
    avatar_url: {type: String },
    gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },
    // 一句话简介
    headline: {type: String },
    // 居住地
    location: { type: [{ type: String }], select: false},
    // 所处行业
    business: { type: String, select: false },
    // 职业经历
    employments: {
        type: [{
            company: { type: String},
            job: { type: String }
        }],
        select: false
    },
    // 教育经历
    educations: {
        type: [{
            school: { type: String },
            major: { type: String },
            diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number }
        }],
        select: false
    }

})

module.exports = model('User', userSchema)