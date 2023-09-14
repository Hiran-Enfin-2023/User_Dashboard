const userModel = require("../models/userModel");
const bcyrpt = require("bcryptjs")
exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, phoneNumber, password, confirmPassword } = req.body;

  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    res.status(401).json({
      message: "Please fill all fields",
    });
  } else {
    try {
      const existUser = await userModel.findOne({ email: email });

      if (existUser) {
        res.status(401).json({
          message: "email already in use",
        });
      } else if (password !== confirmPassword) {
        res.status(401).json({
          message: "please re-enter correct password",
        });
      } else {

        const salt = bcyrpt.genSaltSync(12)
        const passwordHashed =  bcyrpt.hashSync(password,salt)
        const confirmPasswordHashed =  bcyrpt.hashSync(confirmPassword,salt)

        const newUser = await userModel({
          name,
          email,
          phoneNumber,
          password : passwordHashed,
          confirmPassword : confirmPasswordHashed,
        });

        const user = await newUser.save();
        const {password,confirmPassword, ...rest } = user
        res.status(200).json({
            message:"user created",
            user : rest
        })
      }
    } catch (error) {
        res.status(422).json({
            message:error
        })
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
        const isPasswordValid = await bcyrpt.compare(password,user.password);

        if(isPasswordValid){
            res.status(200).json({
                message:"Logged in successfully",
                user:user
            })
        }
    } catch (error) {
        
    }
}