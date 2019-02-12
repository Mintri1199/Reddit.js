const jwt = require('jsonwebtoken')
const app = require('express')()
const User = require('../models/user')
const secret = process.env.SECRET

app.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

// SIGN UP POST 
app.post("/sign-up", (req, res) => {
    // Create User and JWT
    const user = new User(req.body)

    user
    .save()
    .then(user => {
        var token = jwt.sign({ _id: user._id, username: user.username }, secret, {expiresIn: "60 days"} )
        res.cookie('nToken', token, { maxAge: 90000, httpOnly: true } )
        res.redirect('/')
    })
    .catch(err => {
        console.log(err.message);
        return res.status(400).send({err : err})
    })
})

// LOGOUT 
app.get('/logout', (req, res) => {
    console.log("clearing cookies");
    
    res.clearCookie('nToken')
    res.redirect('/')
})

 // LOGIN FORM
 app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // Find the username
    User.findOne({username}, "username password")
        .then(user => {
            // User not found 
            if (!user) {
                return res.status(401).send({message: "Wrong Username or Password"})
            }
            // Check of password 
            user.comparePassword(password, (err, isMatch) => {
                //if not Match
                if (!isMatch){
                    return res.status(401).send({message: "Wrong Username or Password"})
                }

                // Create token
                const token = jwt.sign({_id: user._id, username: username}, process.env.SECRET, {expiresIn: "60 days"})

                // Set a cookie to redirect to root
                res.cookie("nToken", token, {maxAge: 90000, httpOnly: true})
                res.redirect("/")
            })
        })
        .catch(err => {
            console.log(err);
        })
})



module.exports = app 