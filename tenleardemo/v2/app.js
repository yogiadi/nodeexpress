var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Topic  = require("./models/topic"),
    Comment     = require("./models/tutorial"),
    User        = require("./models/user")
    // seedDB      = require("./seeds")
    

    
//requiring routes
var tutorialRoutes    = require("./routes/tutorials"),
    topicRoutes = require("./routes/topics"),
    indexRoutes      = require("./routes/index");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  
var configAuth = require('./config/auth');     
mongoose.connect("mongodb://localhost/ten_lear_v10");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new GoogleStrategy({  
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  },
    function(token, refreshToken, profile, done) {
        console.log("Hi");
      process.nextTick(function() {
        User.findOne({ 'google.id': profile.id }, function(err, returnUser) {
          if (err)
            return done(err);
          if (returnUser) {
            console.log(returnUser);
            return done(null, returnUser);
          } else {
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            console.log(newUser);
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));
// passport.use(new GoogleStrategy({
//     clientID:     configAuth.googleAuth.clientID,
//     clientSecret: configAuth.googleAuth.clientSecret,
//     callbackURL: configAuth.googleAuth.callbackURL
//   },
//   function(accessToken, refreshToken, profile, done) {
//       console.log("Hi");
//     User.findOrCreate({ 'google.id': profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/topics", topicRoutes);
app.use("/topics/:id/tutorials", tutorialRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

// db.topics.update({'name':'Oracle'},{$set:{'priority':1}})
// db.tutorials.update({'title':'java title2'},{$set:{'priority':0}})