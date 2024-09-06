import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface AttendanceDto {
  user: string;
  year: number;
  date: Date;
  isPresent: boolean;
}

async function markAttendance(input: AttendanceDto) {
  const formdata = new FormData();
  formdata.append("userId", input.user);
  formdata.append("year", input.year.toString());
  formdata.append("date", input.date.toISOString());
  formdata.append("isPresent", input.isPresent.toString());
  const { data } = await axios.post("/api/v1/attendance", formdata);
  return data;
}

export const useMarkAttendanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: AttendanceDto) => markAttendance(input),
    onSuccess: (_data, _variables) => {
      toast.success("Attendance marked successfully");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};
