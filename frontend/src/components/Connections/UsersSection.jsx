import React from "react";
import { IconCalendarAlt, IconTimesCircle } from "../../pages/Connections";

const SkillTag = ({ skill, type }) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-150";
  const skillTeachBg = "bg-orange-100 text-orange-600 border border-orange-200";
  const skillLearnBg = "bg-green-50 text-green-600 border border-green-200";
  const typeClasses = type === "teach" ? skillTeachBg : skillLearnBg;

  return <span className={`${baseClasses} ${typeClasses}`}>{skill}</span>;
};

const UsersSection = ({ connection, userDetails, handleAction, handleInstructorProfile }) => {

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

  const color = getAvatarColor(userDetails.username);

  return (
    <div
      key={connection._id}
      className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 transition-shadow hover:shadow-xl"
    >
      <div className="flex flex-col items-start gap-4 w-full md:w-auto">
        <div className="flex items-start gap-4 w-full md:w-auto">

          {/* 🔥 ONLY THIS CHANGED */}
          <div
            onClick={() => handleInstructorProfile(userDetails)}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-orange-400 flex-shrink-0 overflow-hidden text-lg font-bold ${color.bg} ${color.text}`}
          >
            {userDetails.profilePic ? (
              <img
                src={userDetails.profilePic}
                alt={userDetails.username || "profile"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className={`w-full h-full items-center justify-center ${
                userDetails.profilePic ? "hidden" : "flex"
              }`}
            >
              {getInitials(userDetails.username)}
            </div>
          </div>

          {/* userDetails and Skills */}
          <div className="flex-grow min-w-0 space-y-2">
            <h1
              onClick={() => handleInstructorProfile(userDetails)}
              className="font-bold text-xl text-gray-900 truncate"
            >
              {userDetails.username}
            </h1>

            {/* Skills to Teach */}
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-sm font-semibold text-gray-700 w-full sm:w-24 flex-shrink-0">
                Teaching:
              </span>
              <div className="flex flex-wrap gap-2">
                {userDetails?.skillsTeach?.map((skill, index) => (
                  <SkillTag
                    key={`teach-${index}`}
                    skill={skill?.name}
                    type="teach"
                  />
                ))}
              </div>
            </div>

            {/* Skills to Learn */}
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-sm font-semibold text-gray-700 w-full sm:w-24 flex-shrink-0">
                Learning:
              </span>
              <div className="flex flex-wrap gap-2">
                {userDetails?.skillsLearn.map((skill, index) => (
                  <SkillTag
                    key={`learn-${index}`}
                    skill={skill?.name}
                    type="learn"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex items-center gap-3 w-full md:w-auto mt-3 md:mt-0">
          <button
            onClick={() =>
              handleAction("book_meeting", connection._id, userDetails)
            }
            className="w-full sm:w-auto md:w-40 flex items-center justify-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition duration-150 shadow-md"
          >
            <IconCalendarAlt className="w-4 h-4" /> Book Meeting
          </button>

          <button
            onClick={() =>
              handleAction("remove", connection._id, userDetails.username)
            }
            className="w-full sm:w-auto md:w-40 flex items-center justify-center gap-2 text-gray-600 border border-gray-300 bg-white px-4 py-2 rounded-xl font-semibold hover:bg-red-50 hover:text-red-600 transition duration-150"
          >
            <IconTimesCircle className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;