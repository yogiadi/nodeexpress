var mongoose=require("mongoose");

var tutorialSchema=mongoose.Schema({
    text:String,
    author:String,
    helpful:Number,
    topic:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tutor"
    }
});
module.exports=mongoose.model("Tutorial",tutorialSchema);