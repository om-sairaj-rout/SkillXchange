// ... your other API functions

export const confirmSession = async (sessionId, userId, confirmationData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/confirm/${sessionId}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(confirmationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to confirm session");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};