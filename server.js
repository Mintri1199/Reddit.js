const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "/views/layouts"),
    defaultLayout: 'main',
    extname: 'hbs'
});


// Setting handlebars as the engine 
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')


app.get('/' , (req, res) => {
    // res.send('hello');
    res.render('test')
});


app.listen(3000, function(){
    console.log('server is listening on port 3000')
});

module.exports = app;