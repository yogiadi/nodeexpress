var mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
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
   tutorials: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Tutorial"
      }
   ],
   priority:Number,
   upvoteuser:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
      ],
   date: { type: Date}
});

module.exports = mongoose.model("Topic", topicSchema);