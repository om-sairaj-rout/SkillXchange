const BASE = "http://localhost:3000";

export const sendContactMessage = async (data) => {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Message sending failed");
  }

  return res.json();
};