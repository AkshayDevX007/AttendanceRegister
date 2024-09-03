import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types/user";
import { LuArrowDownUp } from "react-icons/lu";
import { Link } from "@tanstack/react-router";

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
        <span>{attendanceForYear.totalPercentage}%</span>
      ) : (
        <span>N/A</span>
      );
    },
  },
  {
    id: "edit",
    header: "Mark Attendance",
    cell: ({ row }) => (
      <Link href={`/attendance/mark-attendance/${row.original._id}`}>
        <button className="btn btn-square btn-ghost">
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
      </Link>
    ),
  },
];
