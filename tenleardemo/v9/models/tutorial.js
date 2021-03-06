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
    topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic"
    },
    priority:Number,
    upvoteuser:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
      ],
    date:Date
});

module.exports = mongoose.model("Tutorial", tutorialSchema);