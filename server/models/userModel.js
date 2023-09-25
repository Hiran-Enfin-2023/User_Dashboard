const mongoose = require('mongoose');
const crypto = require("crypto")
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
  resetPasswordToken:String,
  resetPasswordTokenExpired:Date,

  isAdmin:{
    type:Boolean,
    default:false
  }
},
{
    timestamps:true
})


userSchema.methods.getResetToken = function(){
  const token = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

this.resetPasswordTokenExpired = Date.now() + 30 * 60 *1000

return this.resetPasswordToken
}

module.exports = mongoose.model("user",userSchema);