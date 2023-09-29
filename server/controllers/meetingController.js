const meetingModel = require("../models/meetingModel");
const asyncHandler = require("express-async-handler");
const { throwError } = require("../middleware/error");
const mongoose = require("mongoose");
const { fork } = require("child_process");
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
      // meetingTime: new Date(meetingDate)
      meetingDate: meetingDate,
    });

    // console.log(addMeeting);
    const meeting = await meetingModel
      .findById({ _id: addMeeting._id })
      .populate({ path: "host", select: ["name", "email"] })
      .populate({ path: "participants", select: ["name", "email"] });

    const child = fork("./utils/Mail");

    child.send({ meeting: meeting });
    child.on("exit", (data, signal) => {
      console.log("Child process exited with a code of" + data);
    });

    res.status(200).json({
      success: true,
      message: "meeting created",
      meeting,
    });
  } catch (error) {
    next(error);
  }
});

exports.meetings = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const query = req.query.keyword;

    const querySearch = {
      $or: [
        { meetingTitle: { $regex: new RegExp(query, "i") } },
        { slug: { $regex: new RegExp(query, "i") } },
        { "participantList.name": { $regex: new RegExp(query, "i") } },
        { "hostList.name": { $regex: new RegExp(query, "i") } },
      ],
    };

    const meetingsCount = await meetingModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",
          as: "participantList",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "host",
          foreignField: "_id",
          as: "hostList",
        },
      },
      { $match: querySearch },
      { $group: { _id: null, n: { $sum: 1 } } },
    ]);

    const dataCount = meetingsCount[0].n;
    const totalPages = Math.ceil(dataCount / limit);

    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const skip = (currentPage - 1) * limit;

    const meetingsAgg = await meetingModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "participants",
          foreignField: "_id",

          as: "participantList",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "host",
          foreignField: "_id",

          as: "hostList",
        },
      },
      { $match: querySearch },
      {
        $project: {
          "participantList.password": 0,
          participant: 0,
          host: 0,
          "hostList.password": 0,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json({
      success: true,
      totalPages,
      count: dataCount,
      limit,
      meetingsAgg,
    });
    console.log(meetingsCount);

    res.status(200).json({
      message: "success",
      meeting,
    });
  } catch (error) {
    next(error);
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

    console.log(meeting.meetingStatus);

    if (meeting.meetingStatus) {
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
      }else{
        res.status(404).json({
          success: false,
          message: "This user is not invited",
        });
      }
    }else{
      res.status(404).json({
        success: false,
        message:"Currently this meeting is not active"
      })
    }
    
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

exports.invitedMeeting = asyncHandler(async (req, res, next) => {
  try {
    // const querySearch = {
    //   $or: [
    //     { meetingTitle: { $regex: new RegExp(query, "i") } },
    //     { slug: { $regex: new RegExp(query, "i") } },
    //     { "participantList.name": { $regex: new RegExp(query, "i") } },
    //     { "hostList.name": { $regex: new RegExp(query, "i") } },
    //   ],
    // };

    // const reqDate = new Date(req.query.date);
    // console.log(reqDate.toLocaleDateString());
    // const newDate = new Intl.DateTimeFormat("en-in",{
    //   dateStyle:"full"
    // })

    // const pastMeeting = await meetingModel
    //   .find({
    //     $or: [
    //       { participants: new mongoose.Types.ObjectId(req.userId) },
    //       { meetingDate: { $lt: reqDate } },
    //     ],
    //   })
    //   .populate({ path: "participants", select: ["name"] })
    //   .populate({ path: "host", select: ["name"] });

    // const upcomingMeeting = await meetingModel
    //   .find({
    //     $or: [
    //       { participants: new mongoose.Types.ObjectId(req.userId) },
    //       { meetingDate: { $gt: reqDate } },
    //     ],
    //   })
    //   .populate({ path: "participants", select: ["name"] })
    //   .populate({ path: "host", select: ["name"] });

    const userInvitedMeeting = await meetingModel
      .find({
        $or: [{ participants: new mongoose.Types.ObjectId(req.userId) }],
      })
      .populate({ path: "participants", select: ["name"] })
      .populate({ path: "host", select: ["name"] });

    res.status(200).json({
      success: true,
      userInvitedMeeting,
    });
  } catch (error) {
    next(error);
  }
});
