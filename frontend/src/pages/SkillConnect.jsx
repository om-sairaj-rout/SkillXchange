import { useEffect, useState } from "react";
import SearchSection from "../components/SkillConnect/SearchSection";
import UsersSection from "../components/SkillConnect/UsersSection";
import { useSelector } from "react-redux";
import { getRecommendedUsers } from "../API/connectionAPI";

const SkillConnect = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.checkAuth);

  useEffect(() => {
    const loadRecommendedUsers = async () => {
      try {
        if (!user?._id) return;

        const recommended = await getRecommendedUsers(user._id);

        setUsers(recommended);
      } catch (error) {
        console.log(error);
      }
    };

    loadRecommendedUsers();
  }, [user]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800 flex flex-col">

      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">
            Find Your Skill Partner
          </h1>

          <SearchSection setUsers={setUsers}/>
          <UsersSection users={users} setUsers={setUsers} />

        </div>
      </main>
    </div>
  );
};

export default SkillConnect;
