var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age:Number,
    temperament:String
});

var Cat = mongoose.model("Cat",catSchema);

// var george = new Cat({
//   name:"Mrs Norris",
//   age:7,
//   temperament:"Grouchy"
// });

// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong");
//     } else{
//         console.log("We just saved a cat");
//         console.log(cat);
//     }
// });

Cat.create({
    name:"Snow white",
    age:15,
    temperament:"Bland"
},function(err,cats){
    if(err){
        console.log(err);
    }else{
        console.log(cats);
    }
});

Cat.find({},function(err,cats){
    if(err){
        console.log("OH NO ERROR");
        console.log(err);
    } else{
        console.log("ALL THE CATS....");
        console.log(cats);
    }
});