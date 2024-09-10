import { useState } from "react";
import Header from "../components/layouts/header";
import { DataTable } from "../components/table/dataTable";
import { useParams } from "@tanstack/react-router";
import { columns } from "../components/table/attendanceColumn";
import useGetAttendanceForUserQuery from "../actions/attendance/getAttendanceForUser";

const UserAttendance = () => {
  const { id } = useParams({ from: "/attendance/$id" });

  const [year, setYear] = useState(new Date().getFullYear());
  const { data: attendance } = useGetAttendanceForUserQuery({
    userId: id,
    year: year,
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i
  );

  return (
    <>
      <Header />
      <div className="mx-5 md:mx-10 mt-8 mb-24">
        <div>
          {" "}
          <div className="mb-6">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="select select-bordered select-md"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {attendance && attendance.length > 0 && (
            <h1 className="text-xl font-robotoSlab font-bold my-4">
              Attendance of{" "}
              {attendance && attendance.map((a: any) => a.user.name)[0]} for
              year {year}
            </h1>
          )}
          <DataTable
            data={attendance || []}
            columns={columns}
            year={year || currentYear}
          />
        </div>
      </div>
    </>
  );
};

export default UserAttendance;
