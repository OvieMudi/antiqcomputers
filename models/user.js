//Require packages
const mongoose                = require("mongoose"),
      passportLocalMongoose   = require("passport-local-mongoose");
      
//Setup User Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Add passport-local-mongoose plugin
UserSchema.plugin(passportLocalMongoose);//Use passport local mongoose for local strategy
module.exports = mongoose.model("User", UserSchema);