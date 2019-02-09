require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "/views/layouts"),
    defaultLayout: 'main',
    extname: 'hbs'
});

// Database
const database = require('./data/reddit-db')

// Middleware initialization
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Constrollers
const posts = require('./controllers/posts.js')
const comments = require('./controllers/comments.js')
const auth = require("./controllers/auth")


// Models
const Post = require('./models/post')
const Comment = require('./models/comment')

// Use Middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(cookieParser())

// Setting handlebars as the engine 
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// Access controllers & database
app.use(posts)
app.use(comments)
app.use(auth)


app.listen(3000, function(){
    console.log('server is listening on port 3000')
});

module.exports = app;