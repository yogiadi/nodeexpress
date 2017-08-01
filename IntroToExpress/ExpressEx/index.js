var express=require("express");
var app=express();

app.get("/",function(req,res){
   res.send("Hi there, welcome to my assignment"); 
});

app.get("/speak/:animal",function(req,res){
    if (req.params.animal == "cow"){
        res.send("mow");
    }
});

app.get("/speak/:call/:no",function(req,res){
    var content="";
   for (var i =0;i<req.params.no;i++){
      content=content+req.params.call ; 
   }
   console.log(content);
   res.send(content);
});

app.get("*",function(req,res){
   res.send("You lost buddy"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server has started");
    });