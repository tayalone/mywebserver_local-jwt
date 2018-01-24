const passport =require('passport')

const testGetPost = require('./controllers/testGetPost')
const testMoogoose = require('./controllers/testMongoose')
const authController = require('./controllers/auth')
const todoController = require('./controllers/todo')
const adminController = require('./controllers/admin')


// setup strategy is here !!!
require('./services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireAuthLocal = passport.authenticate('local', {session: false})

// const requireAuthFacebook = passport.authenticate('facebook', {session: false})
// const requireAuthFacebook = passport.authenticate('facebook', {failureRedirect: '/login' ,session: false})

module.exports = (app) => {
    // test Controller
    app.get('/get', testGetPost.getuser)
    app.get('/get/:id',testGetPost.getuserId)
    app.post('/post', testGetPost.postuser)

    //test Use Mongoose
    app.post('/createuser', testMoogoose.testCreateUser)

    //Auth Manage
    app.post('/signup', authController.signup)
    app.post('/signin',requireAuthLocal,authController.signin)

    //Reqired Auth Route
    app.get('/secret', requireAuth, (req, res) => {
        res.status(200).send({ success: true })
    })
    // -- จัดการกับ todo
    app.post('/api/createTodo', requireAuth, todoController.createTodo) 
    app.get('/api/showAllTodo', requireAuth, todoController.showAllTodo)
    app.get('/api/todo/:todoID', requireAuth, todoController.showTodoById)
    app.put('/api/todo/:todoID', requireAuth, todoController.updateTodo)
    app.delete('/api/todo/:todoID', requireAuth, todoController.deleteTodo)

    //-- adminจัดการ data
    app.get('/api/admin/users', requireAuth, adminController.users)
    app.get('/api/admin/user/:userID', requireAuth, adminController.findUser)
    app.put('/api/admin/user/:userID', requireAuth, adminController.updateUser)
    app.put('/api/admin/todo/:todoID', requireAuth, adminController.updateTodo)
    app.delete('/api/admin/todo/:todoID', requireAuth, adminController.deleteTodo)

    

}