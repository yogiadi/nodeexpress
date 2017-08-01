 // Import all dependencies into a single var statement
 
 var               express = require("express"), // web-framework for Node.js
                       app = express(), // defining app as importing express
                bodyParser = require("body-parser"), // parse incoming request bodies
                  mongoose = require("mongoose"), // MongoDB object modeling tool  
                     Tutor = require("./models/tutor"), // define tutor schema in models and import it.
                  Tutorial = require("./models/tutorial"), // define tutor schema in models and import it.
                     Topic = require("./models/topic"), // define tutor schema in models and import it.
          expressSanitizer = require("express-sanitizer"), // sanitizer to not allow user javascript as form input
             LocalStrategy = require("passport-local"), // authenticate using a username and password in your Node.js applications
     passportLocalMongoose = require("passport-local-mongoose"), // simplifies building username and password login
                  passport = require("passport"); // authentication middleware for Node
 
 app.use(expressSanitizer()); // use sanitizer
 
 app.use(express.static(__dirname + "/public"));// defining directory path for css and js files
 
 app.set("view engine","ejs"); // call name of template inside views without using .ejs as extension
 
 mongoose.connect("mongodb://localhost/connecttutor"); // Connect to the mongo and create a new database called connecttutor.
 
 app.use(bodyParser.urlencoded({extended: true})); // Just add this one
 
 // order of express sesion, initialize, session ,localize, serialize and deserialize
 
 app.use(require("express-session")({
    secret:"no way man no way", // secret used to sign the session ID cookie
    resave:false,
    saveUninitialized:false
 }));

 app.use(passport.initialize()); // initialize passport

 app.use(passport.session()); // persistent login sessions

 passport.use(new LocalStrategy(Tutor.authenticate())); // Authenticate sessions
 
 passport.serializeUser(Tutor.serializeUser()); // encoding data from session
 
 passport.deserializeUser(Tutor.deserializeUser()); // decoding data from session

 // middleware to assign value to currentUser
 
 app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
 });
 
 //landing page
 
 app.get("/",function(req,res){
     //req.user allows us to access user information
     Tutorial.find({},function(err,allTutorials){
         if(err){
             console.log(err);
         }else{}
         res.render("landing",{tutorials:allTutorials});
     });
 });

 //redirect to add a new tutor
 
 app.get("/new",function(req,res){
     res.render("new");
 });
 
 // register user in the database

 app.post("/tutor", function(req, res){
    var name=req.body.name;
    var email=req.body.email;
    var expert=req.body.expert;
    var fees=req.body.fees;
    var location=req.body.location;
    var username=req.body.username;
    console.log(username);
    var password=req.body.password;
    var newTutor=new Tutor({username:username,name:name,email:email,expert:expert,fees:fees,location:location});
    Tutor.register(newTutor,password,function(err,user){//u
        if(err){
            console.log(err);
            console.log(username);
            return res.render("new");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }
    });
 });
 
 // add home page of a tutor

 app.get('/home',isLoggedIn,function(req,res){
   res.render('show',{tutor:req.user}) 
 });
 
 // redirect to home page of a tutor

//  app.get('/home/:id',function(req,res){
//   Tutor.findById(req.params.id,function(err,foundTutor){
//         if(err){
//             res.redirect("/");
//         }else{
//             res.render('show',{tutor:foundTutor});
//         }
//     });
//  });

 app.get('/home/:id',function(req,res){
  Tutor.findById(req.params.id).populate("tutorials").exec(function(err,foundTutor){
        if(err){
            res.redirect("/");
        }else{
            res.render('show',{tutor:foundTutor});
        }
    });
 });
 

 // redirect to edit a user
 
 app.get('/edit',isLoggedIn,function(req,res){
    console.log(req.user.id);
   res.render('edit',{tutor:req.user}) 
 });

 // edit a user and save in the database
 
 app.post('/edit',isLoggedIn,function(req,res){
    Tutor.findByIdAndUpdate(req.user.id,req.body.tutor,function(err,updatedTutor){
        if(err){
            console.log(err);
            res.redirect("/edit");
        }else{
            res.redirect("/home");
        }
    });
 });
 
 // delete a user
 
 app.get("/delete",isLoggedIn,function(req, res) {
    Tutor.findByIdAndRemove(req.user.id,function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    });
 });
 
 // direct to login user

 app.get("/login",function(req, res) {
   res.render("login"); 
 });


 // login user same as register with additional arguements in calling the function
 
 app.post("/login",passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login"
 }),function(req,res){
    
 });

 // logout user
 
 app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
 });

 // middleware to make sure user is Logged in
 
 function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();//parenthesis is very important
    }
    res.redirect("/login");
 }
 
 app.post("/tutors/:id/tutorials",isLoggedIn,function(req, res){
   //lookup user using ID
   var tutorialText=req.body.tutorialText;
   var tutorialTopic=req.body.tutorialTopic;
   var tutorialHelpful=0;
   var author_id=req.params.id;
   var author_name=req.body.tutorName;
   var tutorial = new Tutorial({
        text:tutorialText,
        author:author_name,
        helpful:tutorialHelpful,
        author_id:author_id,
        topic:tutorialTopic});
    Tutorial.create(tutorial,function(err,tutorial){
        if(err){
            console.log(err);
        }
    });
    Topic.findOne({name:tutorialTopic},function(err,topic){
       if (err){
           console.log(err);
       }else{
           console.log(topic);
           if (topic == null){
               console.log("Inside topic create");
               Topic.create({name:tutorialTopic},function(err,topic){
                   if(err){
                       console.log(err);
                   }
                   else{
                            topic.tutorials.push(tutorial);
                            topic.save();
                   }
               });
           }
           else{
               topic.tutorials.push(tutorial);
               topic.save();
           }
           
       }
   });
//   Tutor.findById(req.params.id, function(err, tutor){
//       if(err){
//           console.log(err);
//         //   res.redirect("/home");
//       } else {
//         Tutorial.create(tutorial, function(err, tutorial){
//           if(err){
//               console.log(err);
//           } else {
//               tutor.tutorials.push(tutorial);
//               tutor.save();
//             //   res.redirect('/home/:id');
//           }
//         });
//       }
//   });
      Tutor.findById(req.params.id, function(err, tutor){
      if(err){
          console.log(err);
        //   res.redirect("/home");
      } else {
              tutor.tutorials.push(tutorial);
              tutor.save();
            //   res.redirect('/home/:id');
          }
        });

   res.redirect('/home/:id');
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

 // starting the connect tutor server
 
 app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connect tutor host");
 });