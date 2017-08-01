var mongoose = require("mongoose");

var tutorialSchema = mongoose.Schema({
    title:String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    priority:Number,
    upvoteuser:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
      ]
    
});

module.exports = mongoose.model("Tutorial", tutorialSchema);