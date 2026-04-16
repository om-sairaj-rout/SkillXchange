import React, { useState } from "react";
import { sendingConnectionReq } from "../../API/connectionAPI";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const UsersSection = ({ users, setUsers }) => {
  const { user } = useSelector((state) => state.checkAuth);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const connectButtonBg = "bg-green-500 hover:bg-green-600";
  const skillTeachBg = "bg-orange-100 text-orange-600 border border-orange-200";
  const skillLearnBg = "bg-green-50 text-green-600 border border-green-200";

  const handleConnect = async (targeted_id) => {
    try {
      if (!user?._id) {
        alert("Please log in to send connection requests.");
        return;
      }

      const connectionData = { senderId: user._id, recieverId: targeted_id };
      const res = await sendingConnectionReq(connectionData);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === targeted_id
            ? { ...u, status: res.status || "requested" }
            : u,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const statusClasses = {
    connect: connectButtonBg,
    requested: "bg-gray-400 cursor-not-allowed",
    connected: "bg-green-400 cursor-not-allowed",
  };

  const SkillTag = ({ skill, type }) => {
    const baseClasses =
      "px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150";
    const typeClasses = type === "teach" ? skillTeachBg : skillLearnBg;

    return <span className={`${baseClasses} ${typeClasses}`}>{skill}</span>;
  };

  // 🔥 initials
  const getInitials = (name = "") =>
    name
      ?.split(" ")
      ?.filter(Boolean)
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2) || "U";

  // 🔥 colors
  const AVATAR_COLORS = [
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-green-100", text: "text-green-800" },
    { bg: "bg-pink-100", text: "text-pink-800" },
    { bg: "bg-purple-100", text: "text-purple-800" },
    { bg: "bg-yellow-100", text: "text-yellow-800" },
  ];

  const getAvatarColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
  };

  return (
    <>
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {users.length > 0
            ? `Found ${users.length} Skill Partners`
            : "Recommended Skill Partners"}
        </h2>
        <div className="space-y-4">
          {users.length > 0 ? (
            currentUsers.map((foundUser) => {
              const status = foundUser.status || "connect";
              const color = getAvatarColor(foundUser.username);

              return (
                <div
                  key={foundUser._id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col sm:flex-row items-start gap-5"
                >
                  <div className="flex-shrink-0 mt-1 group">
                    
                    {/* 🔥 ONLY THIS CHANGED */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border-2 border-orange-400 shadow-md overflow-hidden ${color.bg} ${color.text}`}
                    >
                      {foundUser.profile ? (
                        <img
                          src={foundUser.profile}
                          alt={foundUser.username}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      <div
                        className={`w-full h-full items-center justify-center ${
                          foundUser.profile ? "hidden" : "flex"
                        }`}
                      >
                        {getInitials(foundUser.username)}
                      </div>
                    </div>

                  </div>

                  <div className="flex-grow min-w-0 space-y-2">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="text-xl font-bold text-gray-900 transition-colors truncate">
                        {foundUser.username}
                      </div>
                      {foundUser.rating > 0 && (
                        <div className="flex items-center text-gray-700 text-sm flex-shrink-0 ml-4">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="font-medium">{foundUser.rating}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {foundUser.bio}
                    </p>

                    <div className="pt-2 space-y-3">
                      {foundUser.skillsTeach?.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-sm font-bold text-gray-700 w-24 flex-shrink-0">
                            Teaching Skills:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {foundUser.skillsTeach.slice(0, 3).map((skill, i) => (
                              <SkillTag
                                key={`teach-${i}`}
                                skill={skill?.name}
                                type="teach"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {foundUser.skillsLearn?.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-sm font-bold text-gray-700 w-24 flex-shrink-0">
                            Learning Skills:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {foundUser.skillsLearn.slice(0, 3).map((skill, i) => (
                              <SkillTag
                                key={`learn-${i}`}
                                skill={skill?.name}
                                type="learn"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4 self-center">
                    <button
                      onClick={() => {
                        if (status === "connect") handleConnect(foundUser._id);
                      }}
                      className={`text-white px-5 py-2 rounded-lg font-semibold transition duration-150 shadow-md ${
                        statusClasses[status]
                      }`}
                      disabled={status !== "connect"}
                    >
                      {status === "connect"
                        ? "Connect"
                        : status === "requested"
                        ? "Requested"
                        : "Connected"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 text-lg py-10 bg-white rounded-xl shadow-md">
              No skill partners found. Try a different search term!
            </p>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default UsersSection;