const app = require('express')()
const Post =  require('../models/post')


// Post index
app.get('/' , (req, res) => {
    Post.find({})
    .then(posts => {
        res.render('post-index', { posts})
    })
    .catch(err => {
        console.log(err.message);
    })
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