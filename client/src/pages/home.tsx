import useGetUsersQuery from "../actions/user/getAllUsers";
import Header from "../components/layouts/header";
import UserCard from "../components/userCard";
import { User } from "../types/user";
import AddUser from "../components/addUser";

const Home = () => {
  const { data } = useGetUsersQuery();
  return (
    <>
      <Header />
      <div className="flex justify-center items-center mt-8">
        <div>
      
        <AddUser />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data &&
            data.map((user: User) => <UserCard user={user} key={user._id} />)}
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
