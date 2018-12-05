//====================================================
//          AUTH ROUTES
//====================================================
const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport"),
      User      = require("../models/user");
      

//SIGNUP route for new user
router.get("/signup", function(req, res) {
    res.render("auth/signup");
});

//Handle signup post request
router.post("/signup", function(req, res){
    //register new user
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.error(err);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Antique Computers " + req.user.username);
            res.redirect("/computers");
        });
    });
});

//LOGIN route for existing user
router.get("/login", function(req, res) {
    res.render("auth/login");
});

//use passport.authenticate as middleware to handle login request
router.post("/login", passport.authenticate("local", {
        successRedirect: "/computers",
        failureRedirect: "/login"
    }), function(req, res){
        
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You're now logged out!");
    res.redirect("/computers");
});


module.exports = router;