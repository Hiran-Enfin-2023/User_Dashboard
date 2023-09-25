const crypto = require("crypto");
const meetingModel = require("../models/meetingModel");
const asyncHandler = require("express-async-handler");
const { throwError } = require("../middleware/error");
const apiFeatures = require("../utils/apiFeatures");

// @desc create a new meeting
// @route POST  => /api/meeting/addMeeting
// @access  Admin

exports.createMeeting = asyncHandler(async (req, res, next) => {
  try {
    // const slug = crypto.randomUUID();

    const { meetingTitle, participants, host, slug, meetingDate } =
      req.body.joinData;

    const addMeeting = await meetingModel.create({
      meetingTitle,
      participants,
      host,
      slug: slug.toLowerCase(),
      meetingTime: new Date(meetingDate),
    });

    console.log(addMeeting);
    const meeting = await meetingModel
      .findById({ _id: addMeeting._id })
      .populate({ path: "host", select: ["name", "email"] })
      .populate({ path: "participants", select: ["name", "email"] });

    res.status(200).json({
      success: true,
      message: "meeting created",
      meeting,
    });
  } catch (error) {
    next(error);
  }
});

exports.meetings = asyncHandler(async (req, res) => {
  try {
    // const id = "65081a794e878083a64df98e";
    // const meetings = await meetingModel
    //   .find()
    //   .populate({
    //     path: "host",
    //     select: ["name", "email"],
    //   })
    //   .populate({
    //     path: "participants",
    //     select: ["name", "email"],
    //   });
    // res.status(200).json({
    //   meetings,
    // });

    const meetingsPerPage = 4;
    const apiFeature = new apiFeatures(meetingModel.find(), req.query)
      .search()
      .paginate(meetingsPerPage);
    const meeting = await apiFeature.query
      .populate({ path: "host", select: ["name", "email"] })
      .populate({ path: "participants", select: ["name", "email"] });

    res.status(200).json({
      message: "success",
      meeting,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});

exports.joinMeeting = asyncHandler(async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const user_id = req.userId;

    if (!slug || slug == "") {
      return next(throwError(404, "You are not invited"));
    }

    const meeting = await meetingModel
      .findOne({ slug: slug })
      .populate({ path: "host", select: ["name", "email"] })
      .populate({ path: "participants", select: ["name", "email"] });

    if (
      meeting?.host.map((e) => {
        e._id == user_id;
      }) ||
      meeting?.participants.map((e) => {
        e._id == user_id;
      })
    ) {
      res.status(200).json({
        success: true,
        meeting,
        user_id,
      });
    }


    res.status(404).json({
      success:false,
      message:"This user is not invited",
    })
  } catch (error) {
    next(error);
  }
});

exports.DetailMeeting = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const meeting = await meetingModel
      .findById(id)
      .populate({ path: "host", select: "name" })
      .populate({ path: "participants", select: ["name"] });

    if (!meeting) {
      return next(throwError(404, "No meetings"));
    }

    res.status(200).json({
      success: true,
      message: "Find meeting",
      meeting,
    });
  } catch (error) {
    next(error);
  }
});

exports.EditMeeting = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log(req.body.userData);
    let meeting = await meetingModel.findById({ _id: id });
    if (!meeting) {
      res.send("no meeting");
    }

    meeting = await meetingModel.findByIdAndUpdate(
      id,
      {
        $set: req.body.userData,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    next(error);
  }
});

exports.deActivate = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;

    const meeting = await meetingModel.findById(id);
    if (!meeting) {
      return next(throwError(404, "no meeting found"));
    }

    const { meetingStatus, ...rest } = meeting;

    const changeMeeting = await meetingModel.findByIdAndUpdate(
      id,
      {
        meetingStatus: !meetingStatus,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Meeting status changed",
      changeMeeting,
      // meetingStatus
    });
  } catch (error) {
    next(error);
  }
});
