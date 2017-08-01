var express = require("express");

var app=express();
app.use(express.static("public"));
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var friends=["prashant","anant"];
app.get("/",function(req,res){
    res.render("home",{friends:friends});
});

app.post("/add",function(req,res){
    // console.log(req.body.new);
    var newfriend=req.body.new;
    friends.push(newfriend);
    res.redirect("/");
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
    });