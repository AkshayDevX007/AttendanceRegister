import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useMarkAttendanceMutation } from "../actions/attendance/markAttendanceMutation";
import toast from "react-hot-toast";
import { useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MarkAttendance = ({ users, year }: { users: string[]; year: number }) => {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const {
    mutate: markAttendance,
    isPending: isMarking,
    isSuccess: isMarked,
  } = useMarkAttendanceMutation();

  const handleShowMarkAttendance = () => {
    if (users.length === 0) {
      toast.error("Please select at least one user.");
      return;
    }
    setShowMarkAttendance(true);
  };

  const handleMarkPresent = () => {
    try {
      markAttendance({
        users: users,
        year: year,
        date: value as Date,
        isPresent: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAbsent = () => {
    try {
      markAttendance({
        users: users,
        year: year,
        date: value as Date,
        isPresent: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMarked) {
      setShowMarkAttendance(false);
    }
  }, [isMarked]);

  const handleCancel = () => {
    setShowMarkAttendance(false);
  };

  return (
    <>
      {pathname === "/attendance" && (
        <button className="btn btn-success" onClick={handleShowMarkAttendance}>
          Mark Attendance
        </button>
      )}
      <AnimatePresence>
        {showMarkAttendance && (
          <motion.div
            className="modal modal-open"
            initial={{ opacity: 0, scale: 0.9 }} // Initial animation state
            animate={{ opacity: 1, scale: 1 }} // Animation when entering
            exit={{ opacity: 0, scale: 0.9 }} // Animation when exiting
            transition={{ duration: 0.2 }} // Animation duration
          >
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Mark Attendance for Selected Users
                </h3>
                <div className="mt-4">
                  <Calendar
                    onChange={onChange}
                    value={value}
                    className="custom-calendar"
                  />
                </div>
                <div className="modal-actions mt-4">
                  <button
                    className="btn btn-success mr-2"
                    onClick={handleMarkPresent}
                    disabled={isMarking}
                  >
                    {isMarking ? (
                      <span className="loading loading-ring loading-md"></span>
                    ) : (
                      "Mark Present"
                    )}
                  </button>
                  <button
                    className="btn btn-error mr-2"
                    onClick={handleMarkAbsent}
                    disabled={isMarking}
                  >
                    {isMarking ? (
                      <span className="loading loading-ring loading-md"></span>
                    ) : (
                      "Mark Absent"
                    )}
                  </button>
                  <button className="btn btn-ghost" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarkAttendance;
