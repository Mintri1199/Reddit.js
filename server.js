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

// Middleware
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

// Constrollers
const posts = require('./controllers/posts.js')

// Models
const Post = require('./models/post')

// Middleware initialization
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

// Setting handlebars as the engine 
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')

// Access controllers & database
app.use(posts)




app.listen(3000, function(){
    console.log('server is listening on port 3000')
});

module.exports = app;