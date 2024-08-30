import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function deleteUser(id: string) {
  const { data } = await axios.delete(`/api/v1/user/${id}`);
  return data;
}

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => deleteUser(id),
      onSuccess: (_data, _variables) => {
        toast.success("User deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
      },
      onError: (error: any) => {
        const message = error.response.data.message;
        toast.error(message);
      },
    });
  };

export default useDeleteUserMutation;