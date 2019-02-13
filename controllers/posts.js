const app = require('express')()
const Post =  require('../models/post')
const User = require('../models/user')

// Index
app.get('/', (req, res) => {
    var currentUser = req.user;
    // res.render('home', {});
    console.log(req.cookies);
    Post.find().populate('author')
    .then(posts => {
        console.log(posts);
        
        res.render('post-index', { posts, currentUser });
        // res.render('home', {});
    }).catch(err => {
        console.log(err.message);
    })
})

// Get
app.get('/posts/new', (req, res) => {
    var currentUser = req.user;
    res.render('post-new', {currentUser})
})

// Post Show
app.get('/posts/:id', (req, res) => {
    var currentUser = req.user;
    // Look up the post
    Post.findById(req.params.id).populate('comments').populate('author')
    .then(post => {
        console.log(post);
        
        res.render('posts-show', { post, currentUser })
    })
    .catch(err => {
        console.log(err.message);
    })
})

// Create
app.post('/posts/new', (req, res) => {
    if (req.user) {
        var post = new Post(req.body)
        post.author = req.user._id

        post
        .save()
        .then(post => {
            return User.findById(req.user._id)
        })
        .then(user => {
            user.posts.unshift(post)
            user.save()
            // Redirect to the new post
            res.redirect(`/posts/${post._id}`)
        })
        .catch( err => {
            console.log(err.message);
        })
    } else {
        return res.status(401) // Unaurthorized
    }    
})

// Subreddit 
app.get("/n/:subreddit", function (req, res) {
    var currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
            res.render('post-index', {posts, currentUser})
        })
        .catch(err => {
            console.log(err.message);

        })
})

module.exports = app  