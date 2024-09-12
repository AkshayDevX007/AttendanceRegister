import { Hono } from "hono";
import Attendance from "../models/attendanceModel";
import User from "../models/userModel";

const attendance = new Hono().basePath("/attendance");

// mark attendance
attendance.post("/", async (c) => {
  const body = await c.req.parseBody();
  const { userIds, year, date, isPresent } = body;

  if (!userIds || !year || !date || isPresent === undefined) {
    return c.json({ message: "All fields are requireds" }, 400);
  }
  const users = JSON.parse(userIds as string);

    // Convert date to a JavaScript Date object
    const attendanceDate = new Date(date as string);
    const currentDate = new Date();
  
    // Check if the date is a Sunday (0 = Sunday)
    if (attendanceDate.getDay() != 0) {
      return c.json({ message: "Attendance can only be marked on Sundays" }, 400);
    }
  
    // Check if the date exceeds the current date
    if (attendanceDate > currentDate) {
      return c.json({ message: "Date cannot be in the future" }, 400);
    }
  
    // Check if the date goes back beyond 2020
    const year2020 = new Date('2020-01-01');
    if (attendanceDate < year2020) {
      return c.json({ message: "Date cannot go back beyond the year 2020" }, 400);
    }

  try {
    // Iterate over the array of user IDs
      for (const userId of users) {
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
        const userAttendance = await Attendance.find({ user: userId, year });

        // Calculate total attendance and percentage for the year
        const totalAttendance = userAttendance.reduce(
          (sum, record) => sum + (record.isPresent ? 1 : 0),
          0
        );
        const attendancePercentage =
          (totalAttendance / userAttendance.length) * 100;

        // Update the attendance record for the year in the user document
        const user = await User.findById(userId);
        if (!user) {
          return c.json({ message: `User not found: ${userId}` }, 404);
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
      }
    return c.json(
      { message: "Attendance marked successfully for all users" },
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
