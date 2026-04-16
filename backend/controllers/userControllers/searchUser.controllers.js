const user = require("../../models/user.model");
const connections = require("../../models/connections.model");

// NOTE: For this to work reliably, your currentUserId and otherUserId 
// MUST be valid 24-character hexadecimal ID strings.

const getConnectionStatus = async (currentUserId, otherUserId) => {
    
    // --- 1. Database Query (Using string IDs directly, relying on Mongoose casting) ---
    
    // We search for a document where the 'users' array contains BOTH user IDs
    // Mongoose should automatically cast these ID strings to ObjectIds because 
    // the 'users' field is defined as an array of ObjectIds in the schema.
    const connection = await connections.findOne({
        users: { $all: [currentUserId, otherUserId] } // Using raw ID strings
    });

    // --- 2. Logic ---
    
    // A. No connection exists
    if (!connection) {
        return "connect"; // Show button to send a connection request
    }

    // B. Already connected
    if (connection.status === "accepted") {
        return "connected"; // They are friends/connected
    }

    // C. Connection status is pending (The critical section)
    if (connection.status === "pending") {
        
        // Determine who sent the request using the 'requestedBy' field
        // We use .toString() on both to guarantee a string-to-string comparison
        const requestedByString = connection.requestedBy.toString();
        const currentUserIdString = currentUserId.toString(); 

        if (requestedByString === currentUserIdString) {
            // The current user (viewer) sent the request
            return "requested"; // <-- Status when you sent the request
        } else {
            // The other user sent the request
            // This MUST be an 'accept' status, NOT 'connect'
            return "accept_request"; // Status for an incoming request
        }
    }

    // Fallback 
    return "connect";
};


const searchLearner = async (req, res) => {
  try {
    const term = req.query.searchData;
    const currentUserId = req.query.userId;

     
    console.log("Searching for teachers with term:", term);
    console.log("Current User ID:", currentUserId);

    if (!term || term.trim() === "") {
      return res.status(400).json({ message: "Please provide a search term" });
    }

    const regex = new RegExp(term, "i");

    const learners = await user.find({
      _id: { $ne: currentUserId },
      $or: [
        { username: { $regex: regex } },
        { skillsLearn: { $elemMatch: { name: {$regex: regex } } } },
      ],
    });

    // Add connection status to each learner
    const learnersWithStatus = await Promise.all(
      learners.map(async (u) => {
        const status = await getConnectionStatus(currentUserId, u?._id);
        return { ...u.toObject(), status };
      })
    );

    res.status(200).json(learnersWithStatus);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: error.message });
  }
};

const searchTeacher = async (req, res) => {
  try {
    console.log(req.query);

    const term = req.query.searchData;
    const currentUserId = req.query.userId;

    
    console.log("Searching for teachers with term:", term);
    console.log("Current User ID:", currentUserId);

    if (!term || term.trim() === "") {
      return res.status(400).json({ message: "Please provide a search term" });
    }

    const regex = new RegExp(term, "i");

    const teachers = await user.find({
      _id: { $ne: currentUserId },
      $or: [
        { username: { $regex: regex } },
        { skillsTeach: { $elemMatch: { name: {$regex: regex }, }, }, }, 
      ],
    }).select("-password -__v");

    // Add connection status to each teacher
    const teachersWithStatus = await Promise.all(
      teachers.map(async (u) => {
        const status = await getConnectionStatus(currentUserId, u._id);
        return { ...u.toObject(), status };
      })
    );

    res.status(200).json(teachersWithStatus);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchLearner, searchTeacher };
