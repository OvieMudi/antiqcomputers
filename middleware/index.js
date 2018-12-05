//THIS IS THE SCRIPT FOR ALL ROUTES MIDDLEWARE
const Computer = require("../models/computer"),
      Comment  = require("../models/comment");


let middlewareObj = {};
let adminID = "5b70e9642c06501d5543e33b";//Mane


//MIDDLEWARE FOR CHECKING IF A USER IS LOGGED IN
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    }
    //set flash message
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};


// MIDDLEWARE FOR CHECKING IF A USER OWNS THE COMPUTER POST(AUTHORIZATION)
middlewareObj.isComputerOwner = function isComputerOwner(req, res, next) {
    //CHECK if user logged IN
    if(req.isAuthenticated()){
        //find computer from the database with the id
        Computer.findById(req.params.id, function(err, foundComputer){
            if(err){
                req.flash("error", "Oops, something went wrong");
                res.redirect("back");
                return console.error(err);
            }
            //CHECK IF USER IS AUTHORIZED
            if(foundComputer.author.id.equals(req.user._id)||req.user._id == adminID){
                //move on to the rest of the code
                next();
            } else {
                req.flash("error", "You're not athorized to do that");
                res.redirect("/computers/" + req.params.id);
            }
 
        });

    } else {
        req.flash("error", "You need to be logged in to do that");
        console.error("You need to be logged in to do that!");
        res.redirect("/login");
    }
     
};

//MIDDLEWARE FOR CHECKING IF A USER OWNS THE COMMENT(AUTHORIZATION)
middlewareObj.isCommentAuthor = function isCommentAuthor(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        let adminID = "5b70e9642c06501d5543e33b";//Mane
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err) {
                req.flash("error", err.message);
                console.error(err);
                res.redirect("back");
            } else {
                //check if Author id matches User id
                if(foundComment.author.id.equals(req.user._id)||req.user._id == adminID){
                    next();
                } else {
                    req.flash("error", "You're not authorized to do that");
                    console.error("You're not authorized to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Oops, You need to be logged in to do that");
        console.error("You need to be logged in to do that!");
        res.redirect("back");
    }
};



module.exports = middlewareObj;