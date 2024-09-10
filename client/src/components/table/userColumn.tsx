import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types/user";
import { LuArrowDownUp } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { FaEye } from "react-icons/fa";

export const columns: ColumnDef<User>[] = [
  {
    id: "selectUser",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="btn btn-ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <LuArrowDownUp className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="btn btn-ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <LuArrowDownUp className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <button
        className="btn btn-ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <LuArrowDownUp className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "unitName",
    header: ({ column }) => (
      <button
        className="btn btn-ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Unit Name
        <LuArrowDownUp className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    id: "attendance",
    header: "Attendance Percentage",
    cell: ({ row, table }: { row: any; table: any }) => {
      const year = table.options.meta?.year;
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
    id: "view",
    header: "View Attendance",
    cell: ({ row }) => (
      <Link
        className="btn btn-square btn-ghost"
        to={`/attendance/${row.original._id}`}
      >
        <FaEye className="h-6 w-6" />
      </Link>
    ),
  },
];