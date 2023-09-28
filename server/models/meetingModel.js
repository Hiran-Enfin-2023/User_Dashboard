const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const meetingSchema = new mongoose.Schema(
  {
    meetingTitle: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: ObjectId,
        ref: "user",
        required: true,
      },
    ],
    meetingDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    time:{
      type:Number,
      default:(new Date()).getTime()  
    },
    meetingStatus: {
      type: Boolean,
      // enum: ["Active","inActive"],
      default: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    host: [
      {
        type: ObjectId,
        ref: "user",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meeting",meetingSchema)