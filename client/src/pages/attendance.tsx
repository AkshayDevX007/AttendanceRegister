import { useState } from "react";
import useGetUsersQuery from "../actions/user/getAllUsers";
import Header from "../components/layouts/header";
import { DataTable } from "../components/table/dataTable";
import { columns } from "../components/table/userColumn";

const Attendance = () => {
  const { data: users } = useGetUsersQuery();
  const [year, setYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2021 + 1 },
    (_, i) => currentYear - i
  );

  return (
    <>
      <Header />
      <div className="mx-5 md:mx-10  mt-8 mb-24">
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
          <DataTable data={users || []} columns={columns} year={year || currentYear} />
        </div>
      </div>
    </>
  );
};

export default Attendance;
