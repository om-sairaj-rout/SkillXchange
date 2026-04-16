const BASE = import.meta.env.VITE_API_URL;

export const createBooking = async (bookingData) => {
  const res = await fetch("http://localhost:3000/api/booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Booking creation failed");
  }

  return data;
};

export const getBookings = async (userId) => {
  const res = await fetch(`${BASE}/api/booking/all/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "getting Bookings failed");
  }

  return res.json(); 
};

export const acceptBookings = async (userId,meetingLink) => {
  const res = await fetch(`${BASE}/api/booking/accept/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingLink })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Booking accepted");
  }

  return res.json(); 
};

export const rejectBookings = async (userId) => {
  const res = await fetch(`${BASE}/api/booking/reject/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Booking rejected");
  }

  return res.json(); 
};

export const cancelBookings = async (userId) => {
  const res = await fetch(`${BASE}/api/booking/cancel/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Booking cancelled");
  }

  return res.json(); 
};

export const updateBookingDateTime = async (userId,newDate,newTime) => {
  const res = await fetch(`${BASE}/api/booking/updateDate&Time/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newDate, newTime })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Booking date/time update failed");
  }

  return res.json(); 
};

