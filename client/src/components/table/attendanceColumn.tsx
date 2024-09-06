import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDownUp } from "react-icons/lu";
import { Attendance } from "../../types/attendance";
import EditAttendance from "../editAttendance";

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <LuArrowDownUp className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "isPresent",
    header: () => {
      return (
        <button
          className="btn btn-ghost"
        >
          Is Present
        </button>
      );
    },
  },
  {
    id: "editAttendance",
    header: "Edit",
    cell: ({ row }: { row: any }) => (
      <EditAttendance data={row.original}  />
    ),
  },
 
];
