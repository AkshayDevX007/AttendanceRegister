import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface props {
  userId: string;
  year: number;
}


async function getAttendanceForUser(input: props) {
  const { data } = await axios.get(`/api/v1/attendance/${input.userId}/${input.year}`);
  return data;
}

const useGetAttendanceForUserQuery = (input: props) => {
  return useQuery({
    queryKey: ["usersAttendance", input.userId, input.year],
    queryFn:() => getAttendanceForUser(input),
  });
};

export default useGetAttendanceForUserQuery;
