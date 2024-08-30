import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getUsers() {
  const { data } = await axios.get("/api/v1/user");
  return data;
}

const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export default useGetUsersQuery;