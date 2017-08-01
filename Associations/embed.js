var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");
var postSchema=new mongoose.Schema({
    title:String,
    content:String
});
var userSchema = new mongoose.Schema({
    email : String,
    name : String,
    posts:[postSchema]
});

var User = mongoose.model("User",userSchema);

var Post = mongoose.model("Post",postSchema);

// var newUser = new User({
//     email:"hermoine@hogwarts.edu",
//     name : "Hermoine Granger"
// });

// newUser.posts.push({
//     title:"How to brew polyjuic potion",
//     content:"Just kidding. Go to potions class to learn it"
// });

// newUser.save(function(err,user){
//     if (err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

// newUser.save(function(err,user){
//     if (err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

// var newPost=new Post({
//     title:"Reflections on apples",
//     content:"They are delcious"
// });

// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);        
//     }
// });

User.findOne({name:"Hermoine Granger"},function(err,user){
    if(err){
        console.log(err);
    }else{
        user.posts.push({
            title:"3 thing ",
            content:"Voldemort"
        });
     user.save(function(err,user){
    if (err){
        console.log(err);
    }else{
        console.log(user);
    }
});   
    }
});