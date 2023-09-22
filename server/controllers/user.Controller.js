const userModel = require("../models/userModel");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { throwError } = require("../middleware/error");
const asyncHandler = require("express-async-handler");
const apiFeatures = require("../utils/apiFeatures");
const sendMail = require("../utils/Mail");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phoneNumber, password, confirmPassword } = req.body;

  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    return next(throwError(422, "please fill all fields"));
  } else {
    try {
      const existUser = await userModel.findOne({ email: email });

      if (existUser) {
        return next(throwError(422, "email already in use"));
      } else if (password !== confirmPassword) {
        return next(throwError(422, "please re-enter correct password"));
      } else {
        const salt = bcyrpt.genSaltSync(12);
        const passwordHashed = bcyrpt.hashSync(req.body.password, salt);

        const newUser = await userModel({
          name,
          email,
          phoneNumber,
          password: passwordHashed,
        });

        const user = await newUser.save();
        const { password, confirmPassword, ...rest } = user._doc;
        res.status(200).json({
          message: "user created",
          rest,
        });
      }
    } catch (error) {
      next(error);
    }
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(throwError(422, "please fill all fileds"));
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(throwError(422, "not such mail to login"));
    }
    const isPasswordValid = await bcyrpt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      const { password, confirmPassword, isAdmin, ...rest } = user._doc;
      res.status(200).json({
        message: "Logged in successfully",
        rest,
        isAdmin,
        access_token: token,
      });
    } else {
      return next(throwError(422, "Wrong password"));
    }
  } catch (error) {
    next(error);
  }
});

exports.validateUser = asyncHandler(async (req, res) => {
  try {
    // console.log("controller", req.userId);
    const validUser = await userModel.findOne({ _id: req.userId });

    if (validUser) {
      const { password, confirmPassword, ...rest } = validUser._doc;
      res.status(200).json({
        message: "You are authenticated",
        ...rest,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
});

exports.allUser = asyncHandler(async (req, res, next) => {
  try {
    // const users = await userModel.find();
    const apiFeature = new apiFeatures(userModel.find(), req.query).search();
    const users = await apiFeature.query;
    res.status(201).json({
      message: "success",
      users,
    });
  } catch (error) {
    next(error);
  }
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(throwError(404, "user not found"));
  }

  const resetPasswordToken = "K#JhLJJ#LJ#KKL#LK#J@JLKKlkjjlhrj";

  try {
    sendMail({
      email:user.email,
      subject:"Hello Email test",
      message:"First email test check it"
    })

    res.status(200).json({
      success:true,
      message: `Email sent to ${user.email}`
    })
  } catch (err) {
    next(err)
  }
});
