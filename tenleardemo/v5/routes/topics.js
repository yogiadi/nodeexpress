var express = require("express");
var router  = express.Router();
var Topic = require("../models/topic");
var middleware = require("../middleware");


//INDEX - show all topics
// router.get("/", function(req, res){
//     // Get all topics from DB
//     Topic.find({}, function(err, allTopics){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("topics/index",{topics:allTopics});
//       }
//     });
// });

router.get("/", function(req, res){
    // Get all topics from DB
    Topic.find().populate({path:"tutorials", options: {sort:{"priority": 1},limit:1}}).sort({priority:1}).exec(function(err, allTopics){
       if(err){
           console.log(err);
       } else {
          res.render("topics/index",{topics:allTopics});
       }
    });
});

//CREATE - add new topic to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to topics array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newTopic = {name: name, image: image, description: desc, author:author}
    // Create a new topic and save to DB
    Topic.create(newTopic, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to topics page
            console.log(newlyCreated);
            res.redirect("/topics");
        }
    });
});

//NEW - show form to create new topic
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("topics/new"); 
});

// SHOW - shows more info about one topic
router.get("/:id", function(req, res){
    //find the topic with provided ID
    Topic.findById(req.params.id).populate("tutorials").exec(function(err, foundTopic){
        if(err){
            console.log(err);
        } else {
            console.log(foundTopic)
            //render show template with that topic
            res.render("topics/show", {topic: foundTopic});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkTopicOwnership, function(req, res){
    Topic.findById(req.params.id, function(err, foundTopic){
        res.render("topics/edit", {topic: foundTopic});
    });
});``

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkTopicOwnership, function(req, res){
    // find and update the correct topic
    Topic.findByIdAndUpdate(req.params.id, req.body.topic, function(err, updatedTopic){
       if(err){
           res.redirect("/topics");
       } else {
           //redirect somewhere(show page)
           res.redirect("/topics/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkTopicOwnership, function(req, res){
   Topic.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/topics");
      } else {
          res.redirect("/topics");
      }
   });
});

router.get("/:id/upvote",middleware.isLoggedIn,function(req, res){
   //lookup topic using ID
   Topic.findById(req.params.id,function(err,topic){
       if(err){
           console.log(err);
           req.flash("error", "Didnot upvote topic");
           res.redirect("/topics/" + req.params.id);
        //   res.redirect("/")
        //   "/:tutorial_id/show"
        
       }else{
           if (topic.upvoteuser.indexOf(req.user._id) === -1){
            //   tutorial.priority=tutorial.priority+1;
                if (!topic.priority){
                    topic.priority=0;
                }
                // tutorial.priority=1;
                topic.priority=topic.priority+1;
                topic.upvoteuser.push(req.user._id);
                topic.save();
                console.log(topic.priority);
               req.flash("success", "Topic upvoted");
               
            //   res.redirect(req.params.tutorial_id+"/show");
            res.redirect("/topics/" + req.params.id);
           }else{
               req.flash("error", "User already upvoted tutorial");
            //   res.redirect(req.params.tutorial_id+"/show");
            res.redirect("/topics/" + req.params.id);
           }
       }
   });
});

module.exports = router;

