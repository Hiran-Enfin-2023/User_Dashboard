const jwt = require("jsonwebtoken");

exports.authenticateUser = (req,res,next)=>{
const token = req.headers.authorization;

if(!token){
    res.status(401).json({
        message:"your are not authenticated"
    })}

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            res.status(401).json({
                message:"No valid token"
            })
        }else{
            
            req.userId = user.id;

            next()
        }
    })


}