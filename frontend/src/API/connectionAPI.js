const BASE = "http://localhost:3000";

export const sendingConnectionReq = async (connectionData) => { 
    const res = await fetch(`${BASE}/api/connection/sending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(connectionData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "search failed");
    }
    return res.json();
}

// Accept connection request
export const acceptingConnectionReq = async (connectionId) => {
    const res = await fetch(`${BASE}/api/connection/accept/${connectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Accept request failed");
    }
    return res.json();
};

// Reject connection request
export const rejectingConnectionReq = async (connectionId) => {
    const res = await fetch(`${BASE}/api/connection/reject/${connectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Reject request failed");
    }
    return res.json();
};

//pending connection requests
export const pendingConnectionReq = async (userId) => {
    const res = await fetch(`${BASE}/api/connection/pending/${userId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "failed to load pending requests");
    }
    return res.json();
};

// get all connections
export const getAllConnections = async (userId) => {
    const res = await fetch(`${BASE}/api/connection/all/${userId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "failed to load pending requests");
    }
    return res.json();
};

//remove connection
export const removeConnections = async (connectionId) => {
    const res = await fetch(`${BASE}/api/connection/remove/${connectionId}`, {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "failed to load pending requests");
    }
    return res.json();
};

// Get recommended users based on skills
export const getRecommendedUsers = async (userId) => {
  const res = await fetch(`${BASE}/api/recommended/${userId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch recommended users");
  }

  return data;
};