import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  pendingConnectionReq,
  acceptingConnectionReq,
  rejectingConnectionReq,
} from "../../API/connectionAPI"; // adjust path

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-green-100", text: "text-green-800" },
  { bg: "bg-pink-100", text: "text-pink-800" },
  { bg: "bg-purple-100", text: "text-purple-800" },
];

const ConnectionReqSidebar = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.checkAuth);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch real data
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const res = await pendingConnectionReq(user._id);
        setRequests(res || []); // adjust based on backend response
      } catch (err) {
        console.error("Error fetching requests:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchRequests();
  }, [isOpen, user]);

  // ✅ Accept
  const handleAccept = async (id) => {
  try {
    await acceptingConnectionReq(id);
    setRequests((prev) => prev.filter((r) => r._id !== id));

    // 🔥 ADD THIS
    window.dispatchEvent(new Event("connectionsUpdated"));

  } catch (err) {
    console.error("Accept error:", err.message);
  }
};

  // ❌ Reject
  const handleDecline = async (id) => {
  try {
    await rejectingConnectionReq(id);
    setRequests((prev) => prev.filter((r) => r._id !== id));

    // 🔥 ADD THIS
    window.dispatchEvent(new Event("connectionsUpdated"));

  } catch (err) {
    console.error("Reject error:", err.message);
  }
};

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 flex flex-col border-l border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="text-base font-semibold text-gray-900">
            Connection requests ({requests.length})
          </span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">

          {loading ? (
            <p className="text-center text-gray-400 text-sm">Loading...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No pending requests
            </p>
          ) : (
            requests.map((req, i) => {
              const u = req.requestedBy;
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];

              return (
                <div key={req._id} className="bg-gray-50 rounded-xl p-3">

                  <div className="flex items-center gap-3 mb-3">
                    {u.profilePic ? (
                      <img
                        src={u.profilePic}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${color.bg} ${color.text}`}>
                        {getInitials(u.username)}
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium">{u.username}</p>
                      <p className="text-xs text-gray-500">
                        {u.skillsTeach?.map((s) => s.name).join(", ")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {timeAgo(req.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="flex-1 bg-orange-500 text-white py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleDecline(req._id)}
                      className="flex-1 border py-1 rounded"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectionReqSidebar;