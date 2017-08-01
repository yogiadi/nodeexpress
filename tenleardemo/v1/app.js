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
    indexRoutes      = require("./routes/index")
    
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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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