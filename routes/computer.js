//=====================================================
//              COMPUTER ROUTES
//=====================================================

const express           = require("express"),
      router            = express.Router(),
      methodOverride    = require("method-override"),
      Computer          = require("../models/computer"),
      middleware        = require("../middleware");
      
//Use method-override
router.use(methodOverride("_method"));

let adminID = "5b70e9642c06501d5543e33b";//Mane

// LANDING PAGE
router.get("/", function(req, res){
    res.render("landingPage");
});

//INDEX ROUTE ==== DISPLAY ALL COMPUTERS
router.get("/computers", function(req, res){
    Computer.find({}, function(err, newComputer){
        if(err){
            res.redirect("/");
            return console.error(err);
        }
        res.render("computers/index", {compModels: newComputer});
    });
});

//NEW ROUTE ======= form for adding new computers
router.get("/computers/new", middleware.isLoggedIn, function(req, res) {
    res.render("computers/new");
    
});

//CREATE ROUTE ====== POST route for adding new computer to db
router.post("/computers", middleware.isLoggedIn, function(req, res){
    var compName    = req.body.compName,
        compUrl     = req.body.compURL,
        compDesc    = req.body.compDesc,
        author      = {id: req.user._id, username: req.user.username},
        newComputer = {name: compName,  image: compUrl, description: compDesc, author: author};
// add the new image data to the mongo database      
    Computer.create(newComputer, function(err, result){
        if(err){
            req.flash("error", err.message);
            res.redirect("/computers");
            return console.error(err);
        }
    });
    req.flash("success", 'You just added a "new Oldie!"');
    res.redirect("/computers");
});

//SHOW route ====== shows more info about one dog
router.get("/computers/:id", function(req, res) {
    //find the computer with the id
    Computer.findById(req.params.id).populate("comments").exec(function(err, foundComputer){
        if(err){
            res.redirect("/computers");
            return console.error(err);
        }
        //render the show template of that id
        res.render("computers/show", {foundComputer: foundComputer, adminID: adminID});
    });
    
});

//EDIT route for existing computers
router.get("/computers/:id/edit", middleware.isComputerOwner, function(req, res) {
    //IF USER IS AUTHORIZED ==>
    //find computer from the database with the id
    Computer.findById(req.params.id, function(err, foundComputer){
        if(err){
            res.redirect("back");
            return console.error(err);
        }
            //pass the found computer into the EDIT template and render the template
            res.render("computers/edit", {computer: foundComputer});
    });
    

});

//UPDATE route for existing computers
router.put("/computers/:id", middleware.isComputerOwner, function(req, res){
    //IF USER IS AUTHORIZED ==>
    //find the computer with the id and update the database
    Computer.findByIdAndUpdate(req.params.id, req.body.computer, function(err, updatedComputer){
        if(err){
            req.flash("error", err.message);
            res.redirect("/back");
            return console.error(err);
        }
        //redirect to the SHOW page of the computer
        req.flash("success", "Updated successfully");
        res.redirect("/computers/" + req.params.id);
    });
});

//DESTROY ROUTE DELETING COMPUTERS
router.delete("/computers/:id", middleware.isComputerOwner, function(req, res){
    //find computer by id and remove
    Computer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Oh snap! Something went wrong. Old habbits die hard, don't they?");
            res.redirect("/computers");
        } else{
            req.flash("success", "Computer successfully removed");
            res.redirect("/computers");
        }
    });
});


//EXPORT COMPUTER ROUTE MODULE
module.exports = router;
