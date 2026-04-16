const connections = require("../../models/connections.model");

const  sendingReq = async (req, res) => {
  try {
    const { recieverId, senderId } = req.body;

    let connection = await connections.findOne({
      users: { $all: [recieverId, senderId] }
    });

    if (!connection) {
      connection = new connections({ 
        users: [recieverId, senderId],
        status: "pending",
        requestedBy: senderId,
      });
      await connection.save();
    }

    // Determine status for sender
    let status = "connect";
    if (connection.status === "accepted") status = "connected";
    else if (connection.status === "pending" && connection.requestedBy.toString() === senderId) status = "requested";

    return res.status(200).json({ message: "Connection updated", connection, status });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = sendingReq;
