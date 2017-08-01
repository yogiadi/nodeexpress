var Topic = require("../models/topic");
var Tutorial = require("../models/tutorial");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkTopicOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Topic.findById(req.params.id, function(err, foundTopic){
           if(err){
               req.flash("error", "Topic not found");
               res.redirect("back");
           }  else {
               // does user own the topic?
            if(foundTopic.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkTutorialOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Tutorial.findById(req.params.tutorial_id, function(err, foundTutorial){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the tutorial?
            if(foundTutorial.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please sign in with your Google+ account");
    res.redirect("/");
}

module.exports = middlewareObj;