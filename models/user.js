const mongoose = require('mongoose')
const bcrypt = require('bcrypt-node')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: "String",
    password: "String",
    role: {
        type: "string",
        enum: ["user","admin"],
        default: "user",
        required: [true, "User Must Have role"]
    },
    createDate: { type: Date, default: Date.now },
    editDate: { type: Date, default: Date.now },
    salt: {
        type: "string",
        default: "asdasdsakdfsfaskdfasf"
    }
})

userSchema.pre('save', function (next) {
    let user = this
     bcrypt.genSalt(100 , function(err, salt) {
        if (err) { return next(err) }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            user.password = hash
            user.salt = salt
        })
     })
    next()
})

const User = mongoose.model('user',userSchema)

//export User เพื่อให้fileอื่นเรียกใช้ได้
module.exports = User