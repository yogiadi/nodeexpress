var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Topic = require("../models/topic");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  
var configAuth = require('../config/auth'); 

//root route
// router.get("/", function(req, res){
//     res.render("landing");
// });
//root route being changed

router.get("/", function(req, res){
    // Get all topics from DB
    Topic.find().populate({path:"tutorials", options: {sort:{"priority": 1}}}).sort({priority:1}).exec(function(err, allTopics){
       if(err){
           console.log(err);
       } else {
          res.render("topics/index",{topics:allTopics});
       }
    });
});
router.get("/search", function(req, res){
    // Get all topics from DB
    res.redirect("/");
});
router.post("/search", function(req, res){
    // Get all topics from DB
    var search = req.body.search;
    console.log(search);
    Topic.find({name: new RegExp(search, 'i')}).populate({path:"tutorials", options: {sort:{"priority": 1}}}).sort({priority:1}).exec(function(err, allTopics){
       if(err){
           console.log(err);
       } else {
          res.render("topics/index",{topics:allTopics});
       }
    });
});
// Topic.findById(req.params.id).populate("tutorials").exec(function(err, foundTopic){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundTopic)
//             //render show template with that topic
//             res.render("topics/show", {topic: foundTopic});
//         }
//     });

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Tenlear " + user.username);
           res.redirect("/topics"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/topics",
        failureRedirect: "/login"
    }), function(req, res){
});

// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback/', passport.authenticate('google', {  
  successRedirect: '/',
  failureRedirect: '/login',
}));

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/topics");
});



module.exports = router;