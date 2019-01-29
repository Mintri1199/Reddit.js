const app = require('express')()
const Post =  require('../models/post')


// index
app.get('/' , (req, res) => {
    // res.send('hello');
    res.render('test')
});

// Get
app.get('/posts/new', (req, res) => {
    res.render('post-new')
})

// Create
app.post('/posts/new', (req, res) => {
    console.log(req.body);
    
    const post = new Post(req.body)
    
    post.save((err, body) => {
        return res.redirect(`/`)
    })
})

module.exports = app  