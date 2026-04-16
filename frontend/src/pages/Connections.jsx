import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllConnections, removeConnections } from "../API/connectionAPI";
import { useSelector } from "react-redux";
import BookingModal from "../components/Connections/BookingModal";
import InstructorProfile from "../components/Connections/InstructorProfile";
import UsersSection from "../components/Connections/UsersSection";
import ConnectionReqSidebar from "../components/Connections/ConnectionReqSidebar";

// ===========================================
// === Inline SVG Icons (For self-containment) ===
// ===========================================

const IconSearch = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
    />
  </svg>
);

const IconAngleDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 284.3 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
    />
  </svg>
);

const IconEnvelope = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.6 27.2 8.6 38.6 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
    />
  </svg>
);

const IconTimesCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L256 313.3l-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
    />
  </svg>
);

const IconCalendarAlt = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v29.5 5.7c-1.3 .1-2.5 .2-3.8 .2H3.8c-1.3 0-2.5-.1-3.8-.2V112c0-26.5 21.5-48 48-48H128V32c0-17.7 14.3-32 32-32zm48 192v256H384V192H176zm-48-64h224V144H128v-16zm-48 96c-17.7 0-32 14.3-32 32v224c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32H80z"
    />
  </svg>
);

export { IconTimesCircle, IconCalendarAlt };

// ===========================================
// === Main Connections Component ===
// ===========================================

const Connections = () => {
  const [connectionsData, setConnectionsData] = useState([]); // Raw data from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recentlyAdded");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInsProfileOpen, setIsInsProfileOpen] = useState(false);
  const [userDet, setUserDet] = useState(null);

  // Get current user details from Redux
  const { user } = useSelector((state) => state.checkAuth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Data Fetching Effect ---
  useEffect(() => {
  const fetchConnections = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const response = await getAllConnections(user._id);

      if (response?.connections) {
        setConnectionsData(response.connections);
      } else {
        setConnectionsData([]);
      }
    } catch (err) {
      console.error("Failed to fetch connections:", err);
      setError("Failed to load connections.");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  fetchConnections();

  // 🔥 listen for updates
  const handleUpdate = () => {
    fetchConnections();
  };

  window.addEventListener("connectionsUpdated", handleUpdate);

  return () => {
    window.removeEventListener("connectionsUpdated", handleUpdate);
  };

}, [user?._id]);

  // --- Filtering and Sorting Logic (Optimized with useMemo) ---
  const filteredAndSortedConnections = useMemo(() => {
    let result = [...connectionsData];

    // 1. Filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((conn) => {
        // Since the backend fix ensures userDetails is the OTHER user, we filter on it
        const userDetails = conn.requestedBy;
        if (!userDetails) return false;

        return (
          userDetails.username?.toLowerCase().includes(term) ||
          userDetails?.skillsTeach.some((s) =>
            s?.name.toLowerCase().includes(term),
          ) ||
          userDetails?.skillsLearn.some((s) =>
            s?.name.toLowerCase().includes(term),
          )
        );
      });
    }

    // 2. Sorting
    if (sortBy === "recentlyAdded") {
      result.sort(
        // Use acceptedAt field for sorting (must convert string date to Date object)
        (a, b) =>
          new Date(b.acceptedAt).getTime() - new Date(a.acceptedAt).getTime(),
      );
    } else if (sortBy === "name") {
      result.sort((a, b) => {
        const nameA = a.requestedBy?.username || "";
        const nameB = b.requestedBy?.username || "";
        return nameA.localeCompare(nameB);
      });
    }

    return result;
  }, [connectionsData, searchTerm, sortBy]);

  // --- Action Handlers ---
  const handleAction = async (action, connectionId, userDetails) => {
    // Implement actual API logic for messaging, booking, or removing here
    if (action === "book_meeting") {
      setIsBookingOpen(true);
      setUserDet(userDetails);
    }
    if (action === "remove") {
      await removeConnections(connectionId);
      setConnectionsData((prevData) =>
        prevData.filter((conn) => conn._id !== connectionId),
      );
    }
  };

  const handleInstructorProfile = (userDetails) => {
    setIsInsProfileOpen(true);
    setUserDet(userDetails);
  };

  const formatSortLabel = (key) => {
    switch (key) {
      case "recentlyAdded":
        return "Recently Added";
      case "name":
        return "Name (A-Z)";
      default:
        return "Sort by";
    }
  };

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-orange-500">Loading connections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  const displayConnections = filteredAndSortedConnections;

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800 flex flex-col">
      <div>
        <main className="flex-grow p-6" style={{ paddingTop: "4.5rem" }}>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {displayConnections.length} Connections
              </h1>

              <button
              onClick={() => setIsSidebarOpen(true)}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>

            </div>

            {/* Controls Header: Sort and Search */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-2">
              {/* Sort Dropdown */}
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center items-center gap-2 rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  Sort by:{" "}
                  <span className="font-semibold text-orange-500">
                    {formatSortLabel(sortBy)}
                  </span>
                  <IconAngleDown
                    className={`-mr-1 ml-2 h-4 w-4 transform transition-transform ${
                      isSortOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {isSortOpen && (
                  <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <div className="py-1">
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          sortBy === "recentlyAdded"
                            ? "bg-orange-50 text-orange-600 font-bold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSortBy("recentlyAdded");
                          setIsSortOpen(false);
                        }}
                      >
                        Recently Added
                      </a>
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          sortBy === "name"
                            ? "bg-orange-50 text-orange-600 font-bold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSortBy("name");
                          setIsSortOpen(false);
                        }}
                      >
                        Name (A-Z)
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <label
                htmlFor="searchConnections"
                className="flex items-center w-full sm:w-80 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all"
              >
                <IconSearch className="text-gray-400 mr-2 w-4 h-4 flex-shrink-0" />
                <input
                  className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500 text-sm"
                  type="text"
                  name="searchConnections"
                  id="searchConnections"
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>

            <hr className="border-gray-200" />

            {/* Connection List */}
            <div className="space-y-6">
              {displayConnections.length === 0 ? (
                <p className="text-center mt-10 text-lg text-gray-600 bg-white p-8 rounded-xl shadow-md">
                  No connections match your search criteria.
                </p>
              ) : (
                displayConnections.map((connection) => {
                  const userDetails = connection.requestedBy;
                  if (!userDetails) return null; // Safety check

                  return (
                    <UsersSection
                      key={connection._id}
                      connection={connection}
                      userDetails={userDetails}
                      handleAction={handleAction}
                      handleInstructorProfile={handleInstructorProfile}
                    />
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {isSidebarOpen && (
      <ConnectionReqSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}

      {isBookingOpen && (
        <BookingModal
          instructor={userDet}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {isInsProfileOpen && (
        <InstructorProfile
          instructor={userDet}
          onClose={() => setIsInsProfileOpen(false)}
        />
      )}
    </div>

  );
};

export default Connections;
