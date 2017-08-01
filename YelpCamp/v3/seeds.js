  var   mongoose = require("mongoose");
 
 var Campground=require("./models/campground");
 var Comment=require("./models/comment")
 var data=[
     {
         name:"Salmon Creek",
         image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
         description:"samurai jack back to the track"
     }
     ];
 
 
 function seedDb(){
 Campground.remove({},function(err){
     if(err){
         console.log(err);
     }
     data.forEach(function(seed){
         Campground.create(seed,function(err,campground){
             if(err){
                 console.log(err);
             }else{
                 console.log("added a campground");
                 Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
             }
         }) ;
     });
 
 });
 
 }
 
 module.exports=seedDb;