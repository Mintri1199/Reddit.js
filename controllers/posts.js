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

// Post Show
app.get('/posts/:id', (req, res) => {
    // Look up the post
    Post.findById(req.params.id)
    .populate('comments')
    .then(post => {
        res.render('posts-show', { post })
    })
    .catch(err => {
        console.log(err.message);
    })
})

// Create
app.post('/posts/new', (req, res) => {
    console.log(req.body);
    
    const post = new Post(req.body)
    
    post.save((err, body) => {
        return res.redirect(`/`)
    })
})

// Subreddit 
app.get("/n/:subreddit", function (req, res) {
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render('post-index', {posts})
        })
        .catch(err => {
            console.log(err.message);

        })

    
})

module.exports = app  