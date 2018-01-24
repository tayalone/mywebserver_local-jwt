const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: "string",
    detail: "string",
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    createDate: { type: Date, default: Date.now },
    editDate: { type: Date, default: Date.now },
})

const Todo = mongoose.model('todo',todoSchema)

//export User เพื่อให้fileอื่นเรียกใช้ได้
module.exports = Todo