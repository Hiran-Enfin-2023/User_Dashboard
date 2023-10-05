const mongoose = require('mongoose');
const crypto = require("crypto")
const userSchema = mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  phoneNumber:{
    type:Number,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  imagePath:{
    type:String
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