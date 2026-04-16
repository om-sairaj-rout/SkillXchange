import React, { useState } from "react";
import { confirmSession } from "../../API/sessionAPI";
import ProfilePicture from "../../assets/Profile.jpg";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaEdit, FaHourglassHalf, FaStar, FaVideo } from "react-icons/fa";

const SessionCard = ({
  session,
  isMentor,
  activeTab,
  user,
  handleBookingStatus,
  fetchBookings,
}) => {
  const isUpcoming = activeTab === "upcoming";
  const isRequested = activeTab === "requested";

  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";

  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const isSessionDone = session.session?.status === "DONE";

  const handleConfirmSubmit = async (confirmed) => {
    try {
      await confirmSession(session.session._id, user._id, {
        confirmed,
        rating: !isMentor ? rating : undefined,
        feedback,
      });
      setShowConfirmModal(false);
      fetchBookings();
    } catch (err) {
      console.error("Confirmation error:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const start = session.pickedDateTime
    ? new Date(session.pickedDateTime)
    : null;
  const formattedDate = start ? start.toLocaleDateString() : "N/A";
  const formattedTime = start
    ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "N/A";
  const end = start
    ? new Date(start.getTime() + session.duration * 60000)
    : null;
  const formattedEndTime = end
    ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex-shrink-0">
  {(
    isMentor ? session.learner?.profilePic : session.mentor?.profilePic
  ) ? (
    <img
      src={isMentor ? session.learner.profilePic : session.mentor.profilePic}
      alt="profile"
      className="w-20 h-20 rounded-full object-cover border-2 border-orange-200"
    />
  ) : (
    <div
      className={`w-20 h-20 flex items-center justify-center rounded-full border-2 border-orange-200 text-2xl font-extrabold ${
        [
          "bg-blue-100 text-blue-800",
          "bg-green-100 text-green-800",
          "bg-pink-100 text-pink-800",
          "bg-purple-100 text-purple-800",
        ][
          (
            (
              isMentor
                ? session.learner?.username
                : session.mentor?.username
            ) || "U"
          ).charCodeAt(0) % 4
        ]
      }`}
    >
      {(
        isMentor ? session.learner?.username : session.mentor?.username
      )
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"}
    </div>
  )}
</div>

      <div className="flex-grow space-y-1">
        <h3 className="text-xl font-bold text-gray-900">{session.skill}</h3>
        <p className="text-gray-700 text-sm">
          {isMentor ? (
            <span>
              Mentoring{" "}
              <span className="font-semibold">{session.learner?.username}</span>
            </span>
          ) : (
            <span>
              Learning with{" "}
              <span className="font-semibold">{session.mentor?.username}</span>
            </span>
          )}
        </p>

        <div className="flex items-center text-gray-600 text-sm space-x-4 mt-1">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-2" /> {formattedDate}
          </span>
          <span className="flex items-center">
            <FaClock className="mr-2" /> {formattedTime} - {formattedEndTime}
          </span>
        </div>

        <span
          className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}
        >
          {session.status === "ACCEPTED" && <FaCheckCircle className="mr-1" />}
          {session.status === "PENDING" && <FaHourglassHalf className="mr-1" />}
          {session.status === "COMPLETED" && <FaStar className="mr-1" />}
          {session.status === "ACCEPTED" ? "CONFIRMED" : session.status}
        </span>
      </div>

      <div className="flex-shrink-0 flex flex-col space-y-2">
        {session.status === "ACCEPTED" && isSessionDone && (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md animate-pulse"
          >
            Confirm Meeting
          </button>
        )}

        {isUpcoming && session.status === "ACCEPTED" && !isSessionDone && (
          <>
            <a
              href={session.meetingLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 text-sm font-semibold text-white rounded-lg transition ${primaryOrangeBg} shadow-md text-center`}
            >
              <FaVideo className="inline-block mr-2" /> Join Session
            </a>
            <button
              onClick={() => setShowRescheduleModal(true)}
              className="px-5 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition shadow-sm"
            >
              <FaEdit className="inline-block mr-2" /> Reschedule
            </button>
          </>
        )}

        {isRequested && isMentor && (
          <>
            <button
              onClick={() => setShowMeetingModal(true)}
              className="px-5 py-2 text-sm font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
            >
              Accept
            </button>
            <button
              onClick={() => handleBookingStatus(session._id, "rejected")}
              className="px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
            >
              Decline
            </button>
          </>
        )}

        {isRequested && !isMentor && (
          <button
            onClick={() => handleBookingStatus(session._id, "cancelled")}
            className="px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
          >
            Cancel Request
          </button>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Session Ended</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Please confirm completion to release credits to the mentor.
            </p>
            <div className="space-y-4">
              {!isMentor && (
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">
                    Rate Mentor
                  </label>
                  <div className="flex gap-2 text-2xl text-yellow-400">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar
                        key={n}
                        className={
                          rating >= n
                            ? "cursor-pointer"
                            : "text-gray-200 cursor-pointer"
                        }
                        onClick={() => setRating(n)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Feedback
                </label>
                <textarea
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="How was the experience?"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => handleConfirmSubmit(false)}
                className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100"
              >
                No, Refund
              </button>
              <button
                onClick={() => handleConfirmSubmit(true)}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-slate-800">
                Create Meeting
              </h2>
              <p className="text-sm text-slate-500">
                Add a link to confirm this session
              </p>
            </div>
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Paste meeting link here..."
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00] transition-all"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 bg-gray-100 text-slate-700 font-semibold py-2.5 rounded-xl"
                  onClick={() => setShowMeetingModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-[#10b981] text-white font-semibold py-2.5 rounded-xl"
                  onClick={async () => {
                    await handleBookingStatus(
                      session._id,
                      "accepted",
                      meetingLink,
                    );
                    setShowMeetingModal(false);
                  }}
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">Reschedule Booking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">New Date</label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">New Time</label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  onChange={(e) => setRescheduleTime(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleBookingStatus(session._id, "rescheduled", null, {
                    date: rescheduleDate,
                    time: rescheduleTime,
                  });
                  setShowRescheduleModal(false);
                }}
                className={`px-4 py-2 bg-blue-600 text-white rounded ${primaryOrangeBg}`}
              >
                Update Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
