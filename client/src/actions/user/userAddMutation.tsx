import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UserDto {
  name: string;
  email: string;
  phone: string;
  unitName: string;
}

async function addUser(input: UserDto) {
  const formdata = new FormData();
  formdata.append("name", input.name);
  formdata.append("email", input.email);
  formdata.append("phone", input.phone);
  formdata.append("unitName", input.unitName);
  const { data } = await axios.post("/api/v1/user", formdata);
  return data;
}

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UserDto) => addUser(input),
    onSuccess: (_data, _variables) => {
      toast.success("User added successfully");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
    onError: (error: any) => {
      const message = error.response.data.message;
      toast.error(message);
    },
  });
};
