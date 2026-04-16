import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

// ✅ Initials function
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ✅ Dynamic color function (based on username)
const getAvatarColor = (name = "") => {
  const colors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  return colors[name.length % colors.length];
};

// Icons
const IconArrowLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
    />
  </svg>
);

export const IconStar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="currentColor"
      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-11.4 1.7-20.4 10.1-24.5 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 11.6 2.6 23.4 13.4 30s23.3 7.6 34 2.5l120.7-61.1 120.7 61.1c10.6 5.1 23.4 4.1 34-2.5s15.4-18.4 13.4-30L438.5 329 542.7 225.9c8.6-8.5 11.3-20.8 7.9-32.7s-13.5-20-24.9-21.7L381.2 150.3 316.9 18z"
    />
  </svg>
);

const SkillCard = ({ title, price }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
    <span className="font-medium text-gray-800">{title}</span>
    <span className="font-bold text-gray-700">${price}/hour</span>
  </div>
);

const InstructorProfile = ({ instructor, onClose }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!instructor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Profile not found.</p>
      </div>
    );
  }

  // ✅ Get avatar color
  const avatarBg = getAvatarColor(instructor.username);

  return (
    <div className="overflow-y-auto fixed inset-0 z-50 backdrop-blur bg-black/30 flex justify-center p-4">
      <div className="flex flex-col items-center min-h-full w-full">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl transform scale-80 animate-zoom-in relative">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IconArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* ✅ Avatar Logic */}
            {instructor.profilePic ? (
              <img
                src={instructor.profilePic}
                alt={`${instructor.username}'s profile`}
                className="w-20 h-20 rounded-full object-cover border-2 border-orange-400 shadow-md"
              />
            ) : (
              <div
                className={`w-20 h-20 rounded-full ${avatarBg} flex items-center justify-center border-2 border-orange-400 shadow-md`}
              >
                <span className="text-white text-xl font-bold">
                  {getInitials(instructor.username)}
                </span>
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {instructor.username}
              </h1>

              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(instructor.rating)
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    />
                  ))}
                </div>

                <span className="ml-2 text-sm text-gray-700 font-semibold">
                  {instructor.rating}
                </span>

                <span className="ml-3 flex items-center text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                About {instructor.username}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {instructor.bio || "This instructor hasn't added yet."}
              </p>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                My Skills & Offerings
              </h2>

              <div className="h-64 overflow-y-auto space-y-3">
                {instructor.skillsTeach.length > 0 ? (
                  instructor.skillsTeach.map((skill, index) => (
                    <SkillCard
                      key={index}
                      title={skill.name}
                      price={skill.pricing}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No skills and offerings listed.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-orange-600 transition duration-150 shadow-lg"
            >
              Book a Session with {instructor.username}
            </button>
          </div>
        </div>
      </div>

      {isBookingOpen && (
        <BookingModal
          instructor={instructor}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
};

export default InstructorProfile;