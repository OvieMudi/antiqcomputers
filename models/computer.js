var mongoose = require("mongoose");

//Define the Computer Schema
var computerSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    },
    comments: [
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
                }
    ]
});
// export module for use in the app
module.exports = mongoose.model("Computer", computerSchema);
