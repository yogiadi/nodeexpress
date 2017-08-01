var mongoose=require("mongoose");

var topicSchema=mongoose.Schema({
    name:String,
    tutorials: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Tutorial"
      }
   ],
   author:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tutor"
    }]

});
module.exports=mongoose.model("Topic",topicSchema);