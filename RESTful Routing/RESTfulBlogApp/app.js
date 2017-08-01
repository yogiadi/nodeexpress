var express=require("express"),
    bodyParser=require("body-parser"),
    methodOverride =require("method-override"),
    mongoose=require("mongoose"),
    expressSanitizer=require("express-sanitizer"),
    app = express();
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
//Model config
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body:   String,
    created:{type :Date,default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

//RESTful ROUTES
// Blog.create({
//     title:"Test Blog",
//     image:"https://www.gstatic.com/webp/gallery/4.sm.jpg",
//     body:"HELLO This is a blog post"
// });


app.get("/",function(req,res){
    res.redirect("blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});

//NEW ROUTE

app.get("/blogs/new",function(req, res) {
    res.render("new");
})

app.post("/blogs",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    console.log("sanitize");
    console.log(req.body);
    Blog.create(req.body.blog,function(err,newBlog){
          if(err){
              res.render("new");
          }else{
              res.redirect("/blogs");
          }   
    });
});

app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    });
});

app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundBlog});
        }
    });
});

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs" + req.params.id);
        }
    });
});

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        res.redirect("/blogs");
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server is running") ;
});