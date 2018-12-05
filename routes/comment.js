//==============================================================================
//                COMPUTER COMMENT ROUTES
//==============================================================================

const express   = require("express"),
      router    = express.Router(),
      Computer  = require("../models/computer"),
      Comment   = require("../models/comment"),
      middleware = require("../middleware");
      

//Add GET route for new comment form
router.get("/computers/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //find computer with the id and pass it to the template
    Computer.findById(req.params.id, function(err, computer){
        if(err) {return console.error(err);}
        //render the new form
        res.render("comments/new", {computer: computer});
    });
});

//Add a POST route for comment new comment
router.post("/computers/:id/comments", middleware.isLoggedIn, function(req, res){
    //search for the particular computer with the id
    Computer.findById(req.params.id, function(err, computer) {
        if(err){
            console.error(err);
        } else {
            //create new comment from the form
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.error(err);
                    res.redirect("/computers");
                } else {
                    //add the signed in user username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //associate comment to the found computer
                    computer.comments.push(comment);
                    computer.save();
                    //redirect to the computers SHOW page
                    res.redirect("/computers/" + req.params.id);
                    
                }
            });
            
        }
    });
    
});

//EDIT COMMENTS ROUTE
router.get("/computers/:id/comments/:comment_id/edit", middleware.isCommentAuthor, function(req, res){
    //find comment by id and pass comment to edit template
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){res.redirect("back");}
        else {res.render("comments/edit", {computer_id: req.params.id, comment: foundComment});}
    });
        
    
});

//UPDATE COMMENT ROUTE
router.put("/computers/:id/comments/:comment_id", middleware.isCommentAuthor, function(req, res){
    //find the comment by id and update with new data from form
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){res.redirect("back");}
        else{
            req.flash("success", "Updated successfully");
            res.redirect("/computers/"+req.params.id);
        }
    });
});

//DESTROY COMMENT ROUTE
router.delete("/computers/:id/comments/:comment_id", middleware.isCommentAuthor, (req, res)=>{
    //find comment by the id and delete
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
       if(err) console.error(err);
       req.flash("success", "Comment removed");
       res.redirect("back");
    });
});


module.exports = router;