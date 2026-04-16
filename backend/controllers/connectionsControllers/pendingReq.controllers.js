const connections = require("../../models/connections.model");

const pendingReq = async (req, res) => {
    try {
        const requests = await connections.find({
            users: { $in: [req.params.userId] },
            status: "pending",
            requestedBy: { $ne: req.params.userId } // exclude requests they sent themselves
        }).populate("requestedBy", "username profilePic skillsTeach skillsLearn"); // populate requester details

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = pendingReq;