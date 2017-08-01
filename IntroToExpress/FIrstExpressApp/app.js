var express = require("express");
var app=express();

app.get("/",function(req,res){
   res.send("Hi there") ;
});

app.get("/bye",function(req,res){
   res.send("Going now") ;
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
    });