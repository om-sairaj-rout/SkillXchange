import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { searchLearner, searchTeacher } from "../../API/searchUserAPI";
import { useSelector } from "react-redux";

const Search = ({ setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const [userMode, setUserMode] = useState("Learner");

  const { user } = useSelector((state) => state.checkAuth);

  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";

  const handleSubmit = async () => {
    try {
      const term = searchTerm.toLowerCase().trim();
      const queryParams = { searchData: term, userId: user?._id };

      let filteredUsers = [];
      if (userMode === "Learner")
        filteredUsers = await searchTeacher(queryParams);
      else filteredUsers = await searchLearner(queryParams);
      console.log("Filtered Users:", filteredUsers);
      setUsers(filteredUsers); // includes status now
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4 md:p-4 rounded-2xl flex flex-col items-center gap-4">
        <div className="flex flex-col min-[480px]:flex-row items-center gap-5 bg-gray-50 rounded-xl px-4 py-3 w-full max-w-xl">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 w-full max-w-xl shadow-inner border border-gray-200">
            <FaSearch className="text-gray-500 text-xl" />
            <input
              className="w-full outline-none bg-transparent text-lg text-gray-800 placeholder-gray-500"
              type="text"
              placeholder="Search for names, skills, or interests..."
              ref={searchInputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
          </div>
          
          <div className="flex gap-5">
            <div className="flex items-center bg-gray-200 rounded-full p-1">
              <button
                onClick={() => setUserMode("Learner")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition duration-200 ${
                  userMode === "Learner"
                    ? primaryOrangeBg + " text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Learner
              </button>
              <button
                onClick={() => setUserMode("Mentor")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition duration-200 ${
                  userMode === "Mentor"
                    ? primaryOrangeBg + " text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Mentor
              </button>
            </div>

            <button
            className={`block min-[480px]:hidden px-10 py-3 text-lg font-semibold text-white rounded-xl transition duration-150 ${primaryOrangeBg} shadow-md`}
            onClick={handleSubmit}
          >
            Search
            </button>
          </div>
        </div>

        <button
          className={`hidden min-[480px]:block px-10 py-3 text-lg font-semibold text-white rounded-xl transition duration-150 ${primaryOrangeBg} shadow-md`}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
