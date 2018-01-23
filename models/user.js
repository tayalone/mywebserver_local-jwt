const mongoose = require('mongoose')
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
    salt: {
        type: "string",
        default: "asdasdsakdfsfaskdfasf"
    }
}) 

const User = mongoose.model('user',userSchema)

//export User เพื่อให้fileอื่นเรียกใช้ได้
module.exports = User