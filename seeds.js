const mongoose      = require("mongoose"),
      Computer      = require("./models/computer"),
      Comment       = require("./models/comment");
      
//make seeds source array
var data = [
    {
      name: "Altos A",
      image: "http://www.vintage-computer.com/images/altos5system.jpg",
      description: "The Apple II was the second machine in the Apple line. It was based on the apple 1 but added a case, keyboard and built-in graphics support."
    },
     {
      name: "Altos B",
      image: "http://www.vintage-computer.com/images/altos5system.jpg",
      description: "The Apple II was the second machine in the Apple line. It was based on the apple 1 but added a case, keyboard and built-in graphics support."
    },
     {
      name: "Altos C",
      image: "http://www.vintage-computer.com/images/altos5system.jpg",
      description: "The Apple II was the second machine in the Apple line. It was based on the apple 1 but added a case, keyboard and built-in graphics support."
    },
    
];

//drop all computers from the mongodb
function seedDB(){
    //remove all campgrounds
    Computer.remove({}, function(err){
        if (err) return console.error(err);
        console.log("REMOVED ALL COMPUTERS!!!");
    });
    
    //add a few computers
/*    data.forEach(function(seed){
        Computer.create(seed, function(err, computer){
            if(err) return console.error(err);
            console.log("New computer added!");
            
            //create new comment
                Comment.create(
                    {
                        text: "This is was one of my best workstations! Totally kickass.",
                        author: "Trevor"
                    }, function(err, comment){
                        if(err) return console.log(err);
                        computer.comments.push(comment);
                        computer.save();
                            console.log("Created new comment!");
                        
                });
        });
    });*/
}

//add a few comments

module.exports = seedDB;