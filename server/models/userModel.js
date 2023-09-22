const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  name:{
    type:String,
    required:[true, "please enter your name"]
  },
  email:{
    type:String,
    required:[true,"Please enter email"],
    unique:true,
  },
  phoneNumber:{
    type:Number,
    required:[true,"Please enter your name"],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please enter password"]
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},
{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema);