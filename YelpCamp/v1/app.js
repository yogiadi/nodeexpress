var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var campgrounds = 
    [
      {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
      {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
      {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
      {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {  name:"Salmon Creek",image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
      {  name:"Granite hill",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
      {  name:"Mountain Goat's rest",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"}
    ];
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campground",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campground",function(req,res){
    var name=req.body.name;
    var image = req.body.image;
    var newCampground= {name : name , image : image};
    campgrounds.push(newCampground);
    res.redirect("/campground");
});

app.get("/campground/new",function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp host");
});