const testGetPost = require('./controllers/testGetPost')
const testMoogoose = require('./controllers/testMongoose')

module.exports = (app) => {
    // test Controller
    app.get('/get', testGetPost.getuser)
    app.get('/get/:id',testGetPost.getuserId)
    app.post('/post', testGetPost.postuser)

    //test Use Mongoose
    app.post('/createuser', testMoogoose.testCreateUser)
    

}