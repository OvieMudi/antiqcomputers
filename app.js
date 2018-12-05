//Require packages
const express               = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),//used to parse the incoming post request to javascript object
    mongoose                = require("mongoose"),
    session                 = require("express-session"),
    passport                = require("passport"),
    flash                   = require("connect-flash"),
    LocalStrategy           = require("passport-local"),
    
//Require mongoose models
    User                    = require("./models/user"),
    seedDB                  = require("./seeds");
    
    
//Require app routes
    var authRoutes          = require("./routes/auth"),
        computerRoutes      = require("./routes/computer"),
        commentRoutes       = require("./routes/comment");
    
//Connect to the database
// mongoose.connect("mongodb://localhost:27017/antique_computer", {useNewUrlParser: true});
mongoose.connect('mongodb://demodev2:qwerty123@ds163842.mlab.com:63842/antiqcomputer');
//Configure the app
app.set("view engine", 'ejs'); //use ejs for redering the views folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


//Set up passport requirements
app.use(session({
    secret: "Everything is still under control",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Configure passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Use flash
app.use(flash());

//Custom MIDDLEWARE for passing current signed in user into ALL ROUTES and TEMPLATES
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


//seed the database with data
//seedDB();

//USE APP ROUTES
app.use(authRoutes);
app.use(computerRoutes);
app.use(commentRoutes);


//====================================================================================
//            START THE SERVER!
//====================================================================================
app.listen(process.env.PORT, function(){
    console.log(`ANTIQUE COMPUTER SERVER STARTED AT PORT ${process.env.PORT}!!!`);
})