const connections = require("../../models/connections.model"); // Assuming this is your model

const allReq = async (req, res) => {
    try {
        const currentUserId = req.params.userId;
        
        // 1. Find ALL accepted connections where the current user is in the 'users' array
        const connectionsList = await connections.find({
            users: { $in: [currentUserId] }, // Find connections where the user is one of the members
            status: "accepted",              // Only fetch accepted (connected) users
        })
        .select('users acceptedAt') // Select only the fields needed for the connection
        // Populate the 'users' field to get details for BOTH users
        .populate('users', 'username profilePic skillsTeach skillsLearn'); 

        // 2. Transform the results to correctly identify the 'other user'
        const transformedConnections = connectionsList.map(conn => {
            
            // Find the ID of the user who is NOT the current user
            // We use .toString() for safe comparison between ObjectId and string
            const otherUser = conn.users.find(u => u._id.toString() !== currentUserId.toString());
            
            // If the connection is corrupted (has no other user), skip it
            if (!otherUser) return null; 

            // Return a clean structure that the frontend expects.
            // CRITICAL: We set the 'requestedBy' field to the OTHER user's details 
            // because that's what your frontend uses to display the connection.
            return {
                _id: conn._id,
                status: conn.status,
                acceptedAt: conn.acceptedAt, 
                connectedOn: conn.acceptedAt, // Frontend expects 'connectedOn'
                requestedBy: otherUser.toObject() // The actual user object you want to display
            };
        }).filter(conn => conn !== null); // Remove any null/corrupted connections

        // Send the transformed list
        res.status(200).json({ count: transformedConnections.length, connections: transformedConnections });

    } catch (error) {
        console.error("Error fetching connections:", error); 
        res.status(500).json({ error: "Failed to fetch connections." });
    }
};

module.exports = allReq;