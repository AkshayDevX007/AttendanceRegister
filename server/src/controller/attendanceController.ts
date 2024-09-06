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

  try {
    // Find existing attendance record for the user, year, and date
    let attendance = await Attendance.findOne({ user: userId, year, date });

    if (attendance) {
      // Update the isPresent status if a record exists
      attendance.isPresent = isPresent as unknown as boolean;
      await attendance.save();
    } else {
      // Create a new attendance record if it doesn't exist
      attendance = await Attendance.create({
        user: userId,
        year,
        date,
        isPresent,
      });
    }

    // Get all attendance records for the user in the given year
    const userAttendance = await Attendance.find({
      user: userId,
      year: year,
    });

    // Calculate total attendance and percentage for the year
    const totalAttendance = userAttendance.reduce((sum, record) => {
      return sum + (record.isPresent ? 1 : 0);
    }, 0);

    const attendancePercentage =
      (totalAttendance / userAttendance.length) * 100;

    // Update the attendance record for the year in the user document
    const user = await User.findById(userId);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const yearIndex = user.attendance.findIndex(
      (a) => a.year === parseInt(year as string)
    );

    if (yearIndex > -1) {
      user.attendance[yearIndex].totalPercentage = attendancePercentage;
    } else {
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
  } catch (error) {
    console.error("Error marking attendance:", error);
    return c.json({ message: "Failed to mark attendance" }, 500);
  }
});

// get attendance for user
attendance.get("/:userId/:year", async (c) => {
  const userId = c.req.param("userId");
  const year = c.req.param("year");
  try {
    const attendance = await Attendance.find({ user: userId, year }).populate(
      "user"
    );
    return c.json(attendance);
  } catch (error) {
    return c.json({ message: "Failed to get attendance" }, 500);
  }
});

// edit attendance
attendance.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { isPresent } = await c.req.parseBody();

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      id,
      {
        isPresent,
      },
      { new: true }
    );
    if (!attendance) {
      return c.json({ message: "Attendance not found" }, 404);
    }

    // Get all attendance records for the user in the given year
    const userAttendance = await Attendance.find({
      user: attendance.user,
      year: attendance.year,
    });

    // Calculate total attendance and percentage for the year
    const totalAttendance = userAttendance.reduce((sum, record) => {
      return sum + (record.isPresent ? 1 : 0);
    }, 0);

    const attendancePercentage =
      (totalAttendance / userAttendance.length) * 100;

    // Update the attendance record for the year in the user document
    const user = await User.findById(attendance.user);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const yearIndex = user.attendance.findIndex(
      (a) => a.year === attendance.year
    );

    if (yearIndex > -1) {
      user.attendance[yearIndex].totalPercentage = attendancePercentage;
    } else {
      user.attendance.push({
        year: attendance.year,
        totalPercentage: attendancePercentage,
      });
    }

    await user.save();

    return c.json(attendance);
  } catch (error) {
    return c.json({ message: "Failed to edit attendance" }, 500);
  }
});

export default attendance;
