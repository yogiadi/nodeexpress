var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Topic = require("../models/topic");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  
var configAuth = require('../config/auth'); 
var middleware = require("../middleware");
var Tutorial = require("../models/tutorial");
var ObjectId = (require('mongoose').Types.ObjectId);

//root route
// router.get("/", function(req, res){
//     res.render("landing");
// });
//root route being changed

router.get("/", function(req, res){
    // Get all topics from DB
    // Topic.find().populate({path:"tutorials", options: {sort:{"priority": 1}}}).sort({priority:1}).exec(function(err, allTopics){
    Topic.find().populate({path:"tutorials", options: {sort:{"priority": -1},limit:1}}).sort({priority:-1}).exec(function(err, allTopics){
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
    Topic.find({name: new RegExp(search, 'i')}).populate({path:"tutorials", options: {sort:{"priority": -1}}}).sort({priority:-1}).exec(function(err, allTopics){
       if(err){
           console.log(err);
       } else {
          res.render("topics/index",{topics:allTopics});
       }
    });
});

router.get("/mentor/search/", function(req, res){
    // Get all topics from DB
    var search = req.query.search;
    console.log("search value is");
    console.log(search);
    // User.find({name: new RegExp(search, 'i')}).populate({path:"tutorials", options: {sort:{"priority": 1}}}).sort({priority:1}).exec(function(err, allTopics){
    // User.find({'google.name': new RegExp(search, 'i')}).sort({priority:-1}).exec(function(err, allUsers){
        // find({'$or':[{title:new RegExp(searchText,'i')},{description:new RegExp(searchText,'i')}]}).exec
        User.find({'$or':[{'google.name': new RegExp(search, 'i')},{'email': new RegExp(search, 'i')},{'keyword': new RegExp(search, 'i')},{'location': new RegExp(search, 'i')}]}).sort({priority:-1}).exec(function(err, allUsers){
       if(err){
           console.log(err);
       } else {
           console.log(allUsers);
          res.render("users/index",{users:allUsers});
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

router.get("/edit/:id",middleware.isLoggedIn, function(req, res){
   res.render("users/edit"); 
});

// router.get("/home/:id",middleware.isLoggedIn, function(req, res){
//   res.render("users/show"); 
// });

router.post("/users/:id",middleware.isLoggedIn, function(req, res){
    // find and update the correct topic
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/");
       }
    });
});

router.get("/mentor/index",function(req, res){
    // Get all mentors from DB
    // Tutorial.find({author: {id:ObjectId("59705da0263489199da76217")}}).populate({path:"topic",select: 'name'}).sort({priority:1}).exec(function(err, allTutorials){
    User.find().sort({priority:-1}).exec(function(err, allUsers){
      if(err){
          console.log(err);
      } else {
          console.log(allUsers);
          res.render("users/index",{users:allUsers});
      }
    });
});

router.get("/home/:id", middleware.isLoggedIn,function(req, res){
    // Get all topics from DB
    console.log(req.params.id);
    // Tutorial.find({author: {id:ObjectId("59705da0263489199da76217")}}).populate({path:"topic",select: 'name'}).sort({priority:1}).exec(function(err, allTutorials){
    Tutorial.find({"author.id":req.user._id}).populate("topic").sort({priority:-1}).exec(function(err, allTutorials){
       if(err){
           console.log(err);
       } else {
          console.log(allTutorials);
          User.findById(req.params.id).exec(function(err, foundUser){
      if(err){
          console.log(err);
      } else {
          console.log(foundUser);
          res.render("users/show",{tutorials:allTutorials,foundUser:foundUser});
      }
    });
        //   res.render("users/show",{tutorials:allTutorials});
       }
    });
});

router.get("/mentor/home/:id",function(req, res){
    // Get all topics from DB
    console.log(req.params.id);
    // Tutorial.find({author: {id:ObjectId("59705da0263489199da76217")}}).populate({path:"topic",select: 'name'}).sort({priority:1}).exec(function(err, allTutorials){
    Tutorial.find({"author.id":req.params.id}).populate("topic").sort({priority:-1}).exec(function(err, allTutorials){
       if(err){
           console.log(err);
       } else {
          console.log(allTutorials);
    User.findById(req.params.id).exec(function(err, foundUser){
      if(err){
          console.log(err);
      } else {
          console.log(foundUser);
          res.render("users/show",{tutorials:allTutorials,foundUser:foundUser});
      }
    });
        //   res.render("users/show",{tutorials:allTutorials});
       }
    });
});

router.post("/edit",middleware.isLoggedIn, function(req, res){
    
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
   req.logOut();
   req.flash("success", "Logged you out!");
   req.session.destroy();
   res.redirect("/topics");
});



module.exports = router;