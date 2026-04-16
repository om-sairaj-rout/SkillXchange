const Session = require("../../models/sessions.model");

const updateSessionStatus = async () => {
  try {
    const now = new Date();

    // 1. PLANNED -> LIVE
    await Session.updateMany(
      { status: "PLANNED", startTime: { $lte: now } },
      { $set: { status: "LIVE" } }
    );

    // 2. LIVE -> DONE (This triggers the "Confirm" button on frontend)
    await Session.updateMany(
      { status: "LIVE", endTime: { $lte: now } },
      { $set: { status: "DONE" } }
    );

  } catch (err) {
    console.error("Error updating session status:", err);
  }
};

module.exports = updateSessionStatus;