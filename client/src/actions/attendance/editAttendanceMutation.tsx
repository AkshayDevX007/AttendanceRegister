import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface EditAttendanceDto {
  isPresent: boolean;
  id: string;
}

async function editAttendance(input: EditAttendanceDto) {
  const formdata = new FormData();
  formdata.append("isPresent", input.isPresent.toString());
  const { data } = await axios.put(`/api/v1/attendance/${input.id}`, formdata);
  return data;
}

export const useEditAttendanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EditAttendanceDto) => editAttendance(input),
    onSuccess: (data, _variables) => {
      toast.success("Attendance updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["usersAttendance", data.user, data.year],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
