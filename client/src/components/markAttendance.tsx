import { useState } from "react";

const MarkAttendance = () => {
    const [showMarkAttendance, setShowMarkAttendance] = useState(false);
    const handleMarkAttendance = () => {
      setShowMarkAttendance(true);
    };
    const handleCancel = () => {
      setShowMarkAttendance(false);
    };

    return (
        <>
            {showMarkAttendance && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Mark Attendance</h3>
              <div className=""></div>

              <div className="modal-actions">
             
              </div>
            </div>
          </div>
        )} 
        </>
    )
}

export default MarkAttendance;

