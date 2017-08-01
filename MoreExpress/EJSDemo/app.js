var express = require("express");

var app=express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",function(req,res){
//   res.send("Welcome to the home page"); 
    // res.render("home.ejs");
    res.render("home");
});



app.get("/fallin/:thing",function(req,res){
//   res.send("Welcome to the home page"); 
    var thing = req.params.thing;
    // res.render("love.ejs",{thingvar:thing});
    res.render("love",{thingvar:thing});
});

app.get("/posts",function(req,res){
//   res.send("Welcome to the home page"); 
    var posts = [
        { title:"Post1 ",author:"Aditya"}
        ];
    // res.render("hate.ejs",{post:posts});
    res.render("hate",{post:posts});
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
    });