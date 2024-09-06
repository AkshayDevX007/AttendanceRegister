import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useMarkAttendanceMutation } from "../actions/attendance/markAttendanceMutation";
import { User } from "../types/user";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MarkAttendance = ({ user, year }: { user: User; year: number }) => {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const { mutate: markAttendance, isPending: isMarking, isSuccess: isMarked } =
    useMarkAttendanceMutation();

  const handleMarkPresent = () => {
    markAttendance({
      user: user._id,
      year: year,
      date: value as Date,
      isPresent: true,
    });
  };

  const handleMarkAbsent = () => {
    markAttendance({
      user: user._id,
      year: year,
      date: value as Date,
      isPresent: false,
    });
  };

  useEffect(() => {
    if (isMarked) {
      setShowMarkAttendance(false);
    }
  }, [isMarked]);


  const handleCancel = () => {
    setShowMarkAttendance(false);
  };

  // Function to disable dates except Sundays
  const isDayDisabled = (date: Date) => date.getDay() !== 0;

  return (
    <>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => setShowMarkAttendance(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
      </button>

      {showMarkAttendance && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Mark Attendance for {user.name}
            </h3>
            <div className="mt-4">
              <Calendar
                onChange={onChange}
                value={value}
                tileDisabled={({ date }) => isDayDisabled(date)}
                className="custom-calendar"
              />
            </div>
            <div className="modal-actions mt-4">
              <button
                className="btn btn-success mr-2"
                onClick={handleMarkPresent}
                disabled={isMarking || isDayDisabled(value as Date)}
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
                disabled={isMarking || isDayDisabled(value as Date)}
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
        </div>
      )}
    </>
  );
};

export default MarkAttendance;
