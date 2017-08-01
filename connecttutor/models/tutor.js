 var   mongoose = require("mongoose");
 var passportLocalMongoose= require("passport-local-mongoose");//added for passport local mongoose
 var tutorSchema = new mongoose.Schema({
    name:String,
    ph_no:String,
    email: String,
    expert:String,
    fees:String,
    location:String,
    username:String,
    password:String,
    tutorials: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Tutorial"
      }
   ]
});

tutorSchema.plugin(passportLocalMongoose);//added for passport local mongoose
module.exports  = mongoose.model("Tutor",tutorSchema);