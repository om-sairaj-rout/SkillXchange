const BASE = import.meta.env.VITE_API_URL;

export const searchTeacher = async (Data) => {
    const params = new URLSearchParams(Data).toString(); // ✅ convert object to query string
    const res = await fetch(`${BASE}/api/search/teacher?${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "search failed");
    }
    return res.json();
}

export const searchLearner = async (Data) => {
    const params = new URLSearchParams(Data).toString(); // ✅ convert object to query string
    const res = await fetch(`${BASE}/api/search/learner?${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "search failed");
    }
    return res.json();
}