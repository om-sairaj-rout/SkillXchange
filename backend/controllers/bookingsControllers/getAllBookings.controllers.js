const booking = require("../../models/booking.model");
const Session = require("../../models/sessions.model");

const getAllBooking = async (req, res) => {
  try {
    const userId = req.params.id;

    // Get bookings and convert to plain JS objects using .lean()
    const bookings = await booking.find({
      $or: [{ learner: userId }, { mentor: userId }]
    })
    .populate('learner', 'username profilePic _id')
    .populate('mentor', 'username profilePic _id')
    .sort({ createdAt: -1 })
    .lean(); 

    // Manually attach the associated session for each booking
    const bookingsWithSessions = await Promise.all(
      bookings.map(async (b) => {
        const sessionData = await Session.findOne({ booking: b._id });
        return { ...b, session: sessionData }; // Frontend expects booking.session
      })
    );

    return res.status(200).json({ 
      message: "Bookings fetched successfully", 
      bookings: bookingsWithSessions 
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = getAllBooking;