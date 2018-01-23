const testGetPost = require('./controllers/testGetPost')
const testMoogoose = require('./controllers/testMongoose')

const authController = require('./controllers/auth')
const passport =require('passport')

// setup strategy is here !!!
require('./services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireAuthLocal = passport.authenticate('local', {session: false})

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
    

}