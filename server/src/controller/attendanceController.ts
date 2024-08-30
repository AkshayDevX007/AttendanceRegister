import { Hono } from "hono";
import Attendance from "../models/attendanceModel";
import User from "../models/userModel";

const attendance = new Hono().basePath("/attendance");

// mark attendance
attendance.post("/", async (c) => {
  const body = await c.req.parseBody();
  const { userId, year, date, isPresent } = body;

  if (!userId || !year || !date || isPresent === undefined) {
    return c.json({ message: "All fields are required" }, 400);
  }

  // Create new attendance record
  const attendance = await Attendance.create({
    user: userId,
    year,
    date,
    isPresent,
  });

  // Get all attendance records for the user in the given year
  const userAttendance = await Attendance.find({
    user: userId,
    year: year,
  });

  // Calculate total attendance and percentage for the year
  const totalAttendance = userAttendance.reduce((sum, record) => {
    return sum + (record.isPresent ? 1 : 0);
  }, 0);

  const attendancePercentage = (totalAttendance / userAttendance.length) * 100;

  // Update or create the attendance record for the year in the user document
  const user = await User.findById(userId);
  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  const yearIndex = user.attendance.findIndex(
    (a) => a.year === parseInt(year as string)
  );

  if (yearIndex > -1) {
    // Update existing year record
    user.attendance[yearIndex].totalPercentage = attendancePercentage;
  } else {
    // Add new year record
    user.attendance.push({
      year: parseInt(year as string),
      totalPercentage: attendancePercentage,
    });
  }

  await user.save();

  return c.json(
    {
      message: "Attendance marked successfully",
      attendance: attendance,
      user: user,
    },
    201
  );
});

export default attendance;
