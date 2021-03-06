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
const replies = require('./controllers/replies')

// Models
const Post = require('./models/post')
const Comment = require('./models/comment')

// setup express to server static files
app.use("/public", express.static("public"))

// Use Middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
app.use(cookieParser())

// Custom Middleware
const checkAuth = (req, res, next) => {
    console.log("Checking authorization");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null
    } else {
        
        let token = req.cookies.nToken
        
        var decodedToken = jwt.decode(token, {complete: true} || {})
        
        req.user = decodedToken.payload 
    }
    next()
}
app.use(checkAuth)

// Setting handlebars as the engine 
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// Access controllers & database
app.use(posts)
app.use(comments)
app.use(auth)
app.use(replies)


app.listen(3000, function(){
    console.log('server is listening on port 3000')
});

module.exports = app;