import React from "react";
import { useSelector } from "react-redux";

const UserProfileSection = () => {
  const { user } = useSelector((state) => state.checkAuth);

  // 🔥 initials function
  const getInitials = (name = "") =>
    name
      ?.split(" ")
      ?.filter(Boolean)
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2) || "U";

  // 🔥 avatar colors
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

  const color = getAvatarColor(user?.username);

  return (
    <>
      <section className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-start gap-6">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-6 mb-4">
              
              {/* 🔥 Avatar (only color changed) */}
              <div
                className={`w-24 h-24 rounded-full border-2 border-orange-200 shadow-sm overflow-hidden flex items-center justify-center text-2xl font-bold ${color.bg} ${color.text}`}
              >
                
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                <div
                  className={`w-full h-full items-center justify-center ${
                    user?.profilePic ? "hidden" : "flex"
                  }`}
                >
                  {getInitials(user?.username)}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.username}
                </h1>
                <p className="text-lg text-gray-600">{user?.role}</p>
              </div>
            </div>

            {/* Credits and Rating */}
            <div className="flex justify-start gap-8 mt-4 w-full">
              <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-orange-300 bg-orange-50 text-orange-700 shadow-inner">
                <span className="text-4xl font-bold">
                  {user?.credits || 0}
                </span>
                <span className="text-sm font-medium">Credits</span>
              </div>

              <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-blue-300 bg-blue-50 text-blue-700 shadow-inner">
                <span className="text-4xl font-bold">
                  {user?.rating || 0}
                </span>
                <span className="text-sm font-medium">Rating</span>
              </div>
            </div>
          </div>

          <section className="bg-white p-8 rounded-2xl shadow-md md:min-w-[50%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {user?.bio ||
                "No bio available. Click 'Edit Profile' to add one."}
            </p>
          </section>
        </div>
      </section>
    </>
  );
};

export default UserProfileSection;