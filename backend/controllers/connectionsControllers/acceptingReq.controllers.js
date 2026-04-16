const connections = require("../../models/connections.model");

const acceptingReq = async (req, res) => {
    try {
        const connection = await connections.findById(req.params.id);
        if (!connection) return res.status(404).json({ msg: "Not found" });
    
        connection.status = 'accepted';
        await connection.save();
    
        res.json({ msg: "Request accepted", connection });
        
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = acceptingReq;