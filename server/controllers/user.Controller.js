const userModel = require("../models/userModel");
const bcyrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNumber, password, confirmPassword } = req.body;

  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    res.status(422).json({
      message: "Please fill all fields",
    });
  } else {
    try {
      const existUser = await userModel.findOne({ email: email });

      if (existUser) {
        res.status(422).json({
          message: "email already in use",
        });
      } else if (password !== confirmPassword) {
        res.status(422).json({
          message: "please re-enter correct password",
        });
      } else {

        const salt = bcyrpt.genSaltSync(12)
        const passwordHashed =  bcyrpt.hashSync(req.body.password,salt)
        const confirmPasswordHashed =  bcyrpt.hashSync(req.body.confirmPassword,salt)

        const newUser = await userModel({
          name,
          email,
          phoneNumber,
          password : passwordHashed,
          confirmPassword : confirmPasswordHashed,
        });

        const user = await newUser.save();
        const { password,confirmPassword,...rest } = user._doc
        res.status(200).json({
            message:"user created",
            rest
        })
      }
    } catch (error) {
        res.status(422).json({
            message:error
        })
        console.log(error);
    }
  }
};

exports.login=async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(422).json({
            message:"Please fill all fields"
        })
    }
    try {
        const user = await userModel.findOne({email:email})
        if(!user){
            res.status(422).json({message:"not such email to login"})
        }
        const isPasswordValid = await bcyrpt.compare(req.body.password,user.password);

        if(isPasswordValid){

          const token = jwt.sign({id:user._id,},process.env.JWT_SECRET_KEY)

          const {password, confirmPassword ,...rest} = user._doc
            res.cookie("access_token",token,{
              httpOnly:true
            }).status(200).json({
                message:"Logged in successfully",
                user:rest
            })
        }else{
          res.status(403).json({
            message:"Wrong password"
          })
        }
    } catch (error) {
        res.status(422).json({
          message: error
        })
        console.log(error);
    }
}