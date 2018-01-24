const Todo = require('../models/todo')
exports.createTodo = (req, res, next) => {
    //console.log(req.user)
    //res.send(req.body)
    console.log(req.user)
    const todo = new Todo({
        title: req.body.title,
        detail: req.body.body,
        userID: req.user.id
    })
    todo.save( (err) => {
        if (err) {
            return next(err)
        }
        return res.status(200).send({sucess: true})
    } )
}
exports.showAllTodo = (req, res ,next) => {
    console.log(req.user.id)
    Todo.find({'userID': req.user.id } ,(err, todos) => {
        if (err) { return next(err)}
        if(todos.length > 0){
            return res.status(200).send({todos: todos})
        }
        else {
            return res.status(200).send({todos: {}})
        }
    })
}

exports.showTodoById = (req, res, next) => {
    
    Todo.findById(req.params.todoID, (err, todo)=> {
        if (err) { return next(err) }
        if (todo.userID.equals(String(req.user.id))) {
            return res.status(200).send(todo)
        }else {
            return res.status(401).send("It's not your todo list")
        }
    })
}

exports.updateTodo = (req, res, next) => {
    
    Todo.findById(req.params.todoID, (err, todo)=> {
        if (err) { return next(err) }
        if (todo.userID.equals(String(req.user.id))) {
            
            const todoID = req.params.todoID
            const title = req.body.title
            const detail = req.body.detail
            //console.log(todoID,title,detail)
            const updatedTodo = {
                title : title,
                detail : detail,
                editDate : Date.now()
            }
            Todo.findByIdAndUpdate(req.params.todoID, updatedTodo, (err, todos) => {
                if (err) { return next(err) }
                return res.status(200).send(todos)
            })
        }else {
            return res.status(401).send("It's not your todo list")
        }
    })   
}

exports.deleteTodo = (req, res, next) => {
    Todo.findById(req.params.todoID, (err, todo)=> {
        if (err) { return next(err) }
        if (todo.userID.equals(String(req.user.id))) {
            Todo.findByIdAndRemove(req.params.todoID, (err) => {
                if (err) { return next(err) }

                return res.status(200).send({seccess: true})
            })
        }else {
            return res.status(401).send("It's not your todo list")
        }
    })   
}