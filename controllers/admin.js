const User = require('../models/user')
const Todo = require('../models/todo')

exports.users = (req, res, next) => {
    if (req.user.role != 'admin') return (res.status(401).send("Admin Only"))

    User.find({} , (err, users) => {
        if (err) { return ( next(err) ) }
        res.status(200).send(users)
    })
    
}

exports.findUser = (req, res, next) => {
    if (req.user.role != 'admin') return (res.status(401).send("Admin Only"))
    userID = req.params.userID
    User.findById(userID , (err, existUser) => {
        if (err) { return ( next(err) ) }
        res.status(200).send(existUser)
    })
}

exports.updateUser = (req, res, next) => {
    if (req.user.role != 'admin') return (res.status(401).send("Admin Only"))
    const userID = req.params.userID
    const role = req.body.role
    console.log(role)
    User.findByIdAndUpdate(userID, {role: role}, (err,olduser) => {
        if (err) { return ( next(err) ) }
        res.status(200).send(olduser)
    })
}

exports.updateTodo = (req, res, next) => {
    if (req.user.role != 'admin') return (res.status(401).send("Admin Only"))
        const todoID = req.params.todoID
        const title = req.body.title
        const detail = req.body.detail
        const updatedTodo = {
            title : title,
            detail : detail,
            editDate : Date.now()
        }
        console.log(todoID)
        Todo.findByIdAndUpdate(todoID, updatedTodo, (err, oldTodo) => {
            if (err) { return next(err) }
            return res.status(200).send(oldTodo)
        })
}

exports.deleteTodo = (req, res, next) => {
    if (req.user.role != 'admin') return (res.status(401).send("Admin Only"))
    const todoID = req.params.todoID
    Todo.findByIdAndRemove(todoID, (err) => {
        if (err) { return next(err) }
        return res.status(200).send({seccess: true})
    })
}