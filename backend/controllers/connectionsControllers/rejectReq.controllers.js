const connections = require("../../models/connections.model");

const rejectingReq = async (req, res) => {
    try {
        const connection = await connections.findById(req.params.id);
        if (!connection) return res.status(404).json({ msg: "Not found" });
    
        connection.status = "rejected";
        await connection.deleteOne();
    
        res.json({ msg: "Request rejected", connection });
        
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = rejectingReq; 