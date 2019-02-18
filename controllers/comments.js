const app = require('express')()
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

// CREATE COMMENT
app.post('/posts/:postId/comments', function(req, res) {
    const comment = new Comment(req.body)
    comment.author = req.user._id
    comment
        .save()
        .then(comment => {
            return Promise.all([
                Post.findById(req.params.postId)
            ])
        })
        .then(([post, user]) => {
            post.comments.unshift(comment)
            return Promise.all([
                post.save()
            ])
        })
        .then(post => {
            res.redirect(`/posts/${req.params.postId}`)
        })
        .catch(err => {
            console.log(err);
        })

})



// Create comment
// app.post('/posts/:postId/comments', async function (req, res) { 
//     if(req.user) {
//         try {
//             // create comment
//             const comment = await Comment.create({
//                 ...req.body,
//                 author: req.user._id
//             });
//             // find post by id
//             const post = await Post.findById(req.params.postId);
//             // update post with new comment id
//             post.comments.unshift(comment._id);
//             // save changes to post
//             post.save();
//             // reload page
//             res.redirect(`/posts/${req.params.postId}`)
            
//         } catch (err) {
//             console.log(err);
//         }
//     } else {
//         return res.status(401) // UNAURTHORIZED
//     }
// })


module.exports = app  