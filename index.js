const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 

const routes = require('./routers')

const app = express()

mongoose.connect('mongodb://localhost/my_webserver', (err) => {
    if (err) { console.log("Connection Errors : ",err) }
    else { console.log("Connect Mongo Complete") }
})

app.use(morgan('combined'))

// create application/json parser
app.use(bodyParser.json()) 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

app.listen(5000, () => {
    console.log("My api server run at: 5000")
})

