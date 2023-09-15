const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const meetingSchema = new mongoose.Schema(
  {
    meetingName: {
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
    meetingTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    meetingStatus: {
      type: String,
      enum: ["Active", "Deactive"],
      default: "Active",
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