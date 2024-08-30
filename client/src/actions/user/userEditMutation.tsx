import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface EditUserDto {
  name: string;
  email: string;
  phone: string;
  unitName: string;
  _id: string;
}

async function editUser(input: EditUserDto) {
  const formdata = new FormData();
  formdata.append("name", input.name);
  formdata.append("email", input.email);
  formdata.append("phone", input.phone);
  formdata.append("unitName", input.unitName);
  const { data } = await axios.put(`/api/v1/user/${input._id}`, formdata);
  return data;
}

export const useEditUserMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: EditUserDto) => editUser(input),
    onSuccess: (_data, _variables) => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
