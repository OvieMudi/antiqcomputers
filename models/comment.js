const mongoose = require("mongoose");
 
//Define the comment Schema
var commentSchema = mongoose.Schema({
            text: String,
            author: {
                    id: {
                      type: mongoose.Schema.Types.ObjectId,
                      ref:  "User"
                    },
                    username: String
            }
    });
    
//Make comment model
module.exports = mongoose.model("Comment", commentSchema);