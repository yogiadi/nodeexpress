var express = require("express");
var router  = express.Router({mergeParams: true});
var Topic = require("../models/topic");
var Tutorial = require("../models/tutorial");
var middleware = require("../middleware");

//Tutorials New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find topic by id
    console.log(req.params.id);
    Topic.findById(req.params.id, function(err, topic){
        if(err){
            console.log(err);
        } else {
             res.render("tutorials/new", {topic: topic});
        }
    })
});

//Tutorials Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup topic using ID
   Topic.findById(req.params.id, function(err, topic){
       if(err){
           console.log(err);
           res.redirect("/topics");
       } else {
        Tutorial.create(req.body.tutorial, function(err, tutorial){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to tutorial
               tutorial.author.id = req.user._id;
               tutorial.author.username = req.user.username;
               //save tutorial
               tutorial.save();
               topic.tutorials.push(tutorial);
               topic.save();
               console.log(tutorial);
               req.flash("success", "Successfully added tutorial");
               res.redirect('/topics/' + topic._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:tutorial_id/edit", middleware.checkTutorialOwnership, function(req, res){
   Tutorial.findById(req.params.tutorial_id, function(err, foundTutorial){
      if(err){
          res.redirect("back");
      } else {
        res.render("tutorials/edit", {topic_id: req.params.id, tutorial: foundTutorial});
      }
   });
});

// COMMENT UPDATE
router.put("/:tutorial_id", middleware.checkTutorialOwnership, function(req, res){
   Tutorial.findByIdAndUpdate(req.params.tutorial_id, req.body.tutorial, function(err, updatedTutorial){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/topics/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:tutorial_id", middleware.checkTutorialOwnership, function(req, res){
    //findByIdAndRemove
    Tutorial.findByIdAndRemove(req.params.tutorial_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Tutorial deleted");
           res.redirect("/topics/" + req.params.id);
       }
    });
});

module.exports = router;