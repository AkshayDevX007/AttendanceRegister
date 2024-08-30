import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
