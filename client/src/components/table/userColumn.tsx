import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types/user";
import { LuArrowDownUp } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import MarkAttendance from "../markAttendance";
import { FaEye } from "react-icons/fa";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "unitName",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit Name
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    id: "attendance",
    header: "Attendance Percentage",
    cell: ({ row, table }: { row: any; table: any }) => {
      const year = table.options.state.year;
      const attendanceForYear = row.original.attendance.find(
        (a: any) => a.year === year
      );

      return attendanceForYear ? (
        <span>{attendanceForYear.totalPercentage.toFixed(2)}%</span>
      ) : (
        <span>N/A</span>
      );
    },
  },
  {
    id: "edit",
    header: "Mark Attendance",
    cell: ({ row, table }: { row: any; table: any }) => (
      <MarkAttendance user={row.original} year={table.options.state.year} />
    ),
  },
  {
    id: "view",
    header: "View Attendance",
    cell: ({ row }) => (
      <Link className="btn btn-square btn-ghost" to={`/attendance/${row.original._id}`}>
        <FaEye className="h-6 w-6" />
      </Link>
    ),
  },
];
