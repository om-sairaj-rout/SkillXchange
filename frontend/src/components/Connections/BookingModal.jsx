// src/components/BookingModal.jsx

import { useEffect, useState } from "react";
import ProfilePicture from "../../assets/Profile.jpg";
import { IconTimesCircle } from "../../pages/Connections";
import { useSelector } from "react-redux";
import { createBooking } from "../../API/bookingAPI";

// ✅ Initials function
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ✅ Dynamic avatar color
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

// styles
const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
const selectedSkillBg = "bg-orange-100 border-orange-500";
const defaultSkillBg = "bg-white border-gray-200 hover:border-orange-300";
const availableTimeBg = "bg-orange-500 text-white hover:bg-orange-600";
const defaultTimeBg = "bg-gray-100 text-gray-700 hover:bg-gray-200";

const BookingModal = ({ instructor, onClose }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0.5);

  const { user } = useSelector((state) => state.checkAuth);

  const totalAmount = selectedSkill
    ? selectedSkill?.pricing * sessionDuration
    : 0;

  const mockAvailableTimes = ["9:00", "10:30", "14:00", "16:00", "17:30"];

  const [calendarDate, setCalendarDate] = useState(new Date());

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) =>
    new Date(year, month, 1).getDay();

  const renderCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const numDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);

      const isToday = date.getTime() === today.getTime();
      const isSelected =
        selectedDate && date.getTime() === selectedDate.getTime();
      const isBookable = date >= today;

      days.push(
        <div
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer
            ${isToday ? "border-2 border-orange-500" : ""}
            ${isSelected ? "bg-orange-500 text-white" : ""}
            ${
              isBookable
                ? "hover:bg-gray-200 text-gray-800"
                : "text-gray-400 cursor-not-allowed"
            }
            ${!isBookable ? "opacity-50" : ""}
          `}
          onClick={() => isBookable && setSelectedDate(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const handleMonthChange = (direction) => {
    setCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirmBooking = async () => {
    try {
      const bookingData = {
        learner: user._id,
        mentor: instructor._id,
        skill: selectedSkill.name,
        credits: totalAmount,
        pickedDate: selectedDate.toISOString().split("T")[0],
        pickedTime: selectedTime,
        duration: sessionDuration * 60,
      };

      await createBooking(bookingData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ✅ Avatar color
  const avatarBg = getAvatarColor(instructor?.username);

  return (
    <div className="overflow-y-auto fixed inset-0 z-50 backdrop-blur bg-black/20 flex justify-center p-4">
      <div className="flex flex-col items-center min-h-full w-full ">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl transform scale-80 animate-zoom-in relative">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <IconTimesCircle className="w-6 h-6 text-red-500" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
            
            {/* ✅ UPDATED AVATAR ONLY */}
            {instructor?.profilePic ? (
              <img
                src={instructor.profilePic}
                alt={`${instructor?.username}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 shadow-md"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-full ${avatarBg} flex items-center justify-center border-2 border-orange-400 shadow-md`}
              >
                <span className="text-white font-bold text-lg">
                  {getInitials(instructor?.username)}
                </span>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Book a Session with {instructor?.username}
              </h2>
              <p className="text-gray-600 text-sm">
                Experienced in various skills
              </p>
            </div>
          </div>

          {/* Booking Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Select a Service */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                1. Select a Service
              </h3>
              <div className="h-100 overflow-y-auto space-y-3">
                {instructor.skillsTeach.length > 0 ? (
                  instructor.skillsTeach.map((skill, index) => {
                    const skillPrice = skill.pricing; // Default icon/price
                    const skillName = skill.name;
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer
                                          ${
                                            selectedSkill === skill
                                              ? selectedSkillBg
                                              : defaultSkillBg
                                          }
                                          transition-all duration-200`}
                        onClick={() => setSelectedSkill(skill)}
                      >
                        <div className="flex items-center gap-3">
                          {/* <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                                    <SkillIcon className="w-5 h-5 text-gray-700" />
                                </div> */}
                          <span className="font-medium text-gray-800">
                            {skillName}
                          </span>
                        </div>
                        <span className="font-bold text-gray-700">
                          ${skillPrice}/hour
                        </span>
                        {selectedSkill === skill && (
                          <span className="text-orange-500 ml-2">✔️</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">
                    No skills available to book.
                  </p>
                )}
              </div>
            </div>

            {/* 2. Pick a Date & Time */}
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                2. Select Date & Time
              </h3>

              {/* NEW: Session Duration Input */}
              <div className="mb-4">
                <label
                  htmlFor="session-duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Session Duration (Hours)
                </label>
                {/* You'll need a state variable like `sessionDuration` and a handler like `setSessionDuration` for this input in your React component */}
                <input
                  type="number"
                  id="session-duration"
                  name="session-duration"
                  min={0.5}
                  step={0.5}
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(Number(e.target.value))}
                  className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 0.5 hours (30 minutes)
                </p>
              </div>
              {/* END NEW: Session Duration Input */}

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous Month"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </button>
                  <span className="font-semibold text-gray-800">
                    {calendarDate.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next Month"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-gray-500 text-xs font-medium mb-3">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Time zone: GMT+1 (London)
                </p>
              </div>

              {selectedDate && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Select Time for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {mockAvailableTimes.map((time, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-lg text-sm font-medium
                                          ${
                                            selectedTime === time
                                              ? availableTimeBg
                                              : defaultTimeBg
                                          }
                                          transition-all duration-200`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="time"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={
                        selectedTime &&
                        !mockAvailableTimes.includes(selectedTime)
                          ? selectedTime
                          : ""
                      }
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    <span className="text-xs text-gray-500">
                      Or enter your own time
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Your Booking Summary
              </h3>
              <p className="text-gray-600 text-sm">
                Booking with: {instructor?.username || "N/A"}
                <br />
                Service: {selectedSkill ? selectedSkill.name : "N/A"}
                <br />
                Date:{" "}
                {selectedDate?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) || "N/A"}
                <br />
                Time: {selectedTime || "N/A"} (GMT+1)
              </p>
            </div>
            <div className="flex flex-col items-end mt-4 md:mt-0">
              <p className="text-xl font-bold text-gray-900 mb-2">
                Total: ${totalAmount}
              </p>
              <button
                onClick={handleConfirmBooking}
                className={`${primaryOrangeBg} text-white px-8 py-3 rounded-xl font-semibold transition duration-150 shadow-md
                                ${
                                  !(
                                    selectedSkill &&
                                    selectedDate &&
                                    selectedTime
                                  )
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                disabled={!(selectedSkill && selectedDate && selectedTime)}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;
