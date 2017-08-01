// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require(mongoose);
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seedDb=require("./seeds");
    


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDb();
//SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
//     name:String,
//     image:String,
//     description : String
// });
// var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {name:"Salmon Creek",
//     image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
//     description:"This is a huge granite hill , no bathrooms no water ."
//     },
//     function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     });

// var campgrounds = 
//     [
//       {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//       {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//       {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//         {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//       {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//       {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//         {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//       {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//       {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
//         {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
//       {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
//       {  name:"Mountain Goat's rest",image:" "}
//     ];
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campground",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

app.post("/campground",function(req,res){
    var name=req.body.name;
    var image = req.body.image;
    var description=req.body.description;
    var newCampground= {name : name , image : image,description:description};
    // campgrounds.push(newCampground);
    Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       } else{
          res.redirect("/campground"); 
       }
    });
    
});

app.get("/campground/new",function(req, res) {
   res.render("campgrounds/new.ejs"); 
});

app.get("/campground/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
            // console.log("Below is Campground");
            // console.log(foundCampground);
        }
    })
});

//=========================
// Comments Routes
//=========================

app.get("/campground/:id/comments/new",function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new",{campground : campground});
        }
    })
    
});

app.post("/campground/:id/comments/",function(req,res){
  Campground.findById(req.params.id,function(err,campground){
        if (err){
            console.log(err);
            res.redirect("/campground");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/'+campground._id);
                }
            });
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp host");
});