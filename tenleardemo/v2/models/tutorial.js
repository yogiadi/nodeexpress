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
    priority:Number
});

module.exports = mongoose.model("Tutorial", tutorialSchema);