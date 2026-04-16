import React, { useCallback, useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaEdit,
  FaStar,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import {
  acceptBookings,
  cancelBookings,
  getBookings,
  rejectBookings,
  updateBookingDateTime,
} from "../API/bookingAPI";
import { useSelector } from "react-redux";
import SessionCard from "../components/Sessions/SessinCard";

const SessionPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState({
    upcoming: [],
    past: [],
    requested: [],
  });

  const { user } = useSelector((state) => state.checkAuth);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await getBookings(user?._id);
      const all = res.bookings;

      setBookings({
        upcoming: all.filter(
          (b) => b.status === "ACCEPTED" || b.status === "SCHEDULED",
        ),
        past: all.filter((b) => b.status === "COMPLETED"),
        requested: all.filter((b) => b.status === "PENDING"),
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, [user]);

  // AUTO-POLLING: Added logic to fetch data every 30s so the "Confirm" button appears automatically
  useEffect(() => {
    if (user?._id) {
      fetchBookings();
      const pollInterval = setInterval(fetchBookings, 30000);
      return () => clearInterval(pollInterval);
    }
  }, [user, fetchBookings]);

  const handleBookingStatus = async (
    bookingId,
    status,
    meetingLink,
    rescheduleData = null,
  ) => {
    try {
      if (status === "accepted") await acceptBookings(bookingId, meetingLink);
      else if (status === "rejected") await rejectBookings(bookingId);
      else if (status === "cancelled") await cancelBookings(bookingId);
      else if (status === "rescheduled" && rescheduleData) {
        await updateBookingDateTime(
          bookingId,
          rescheduleData.date,
          rescheduleData.time,
        );
      }
      await fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const activeTabClass = `${primaryOrangeBg} text-white`;
  const inactiveTabClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
            My Sessions
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            {["upcoming", "past", "requested"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === tab ? activeTabClass : inactiveTabClass}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <section className="mt-8 space-y-6">
            {bookings[activeTab].length > 0 ? (
              bookings[activeTab].map((sessionItem) => (
                <SessionCard
                  key={sessionItem._id}
                  session={sessionItem}
                  isMentor={user._id !== sessionItem.learner?._id}
                  activeTab={activeTab}
                  user={user}
                  handleBookingStatus={handleBookingStatus}
                  fetchBookings={fetchBookings}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg py-10 bg-white rounded-2xl shadow-md border border-gray-100">
                {activeTab === "upcoming" && "You have no upcoming sessions."}
                {activeTab === "past" &&
                  "You haven't completed any sessions yet."}
                {activeTab === "requested" &&
                  "No session requests at the moment."}
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default SessionPage;
