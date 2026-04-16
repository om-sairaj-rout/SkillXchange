const booking = require("../../models/booking.model");
const Session = require("../../models/sessions.model");

const acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { meetingLink } = req.body;

    const bookingData = await booking.findById(bookingId);
    if (!bookingData) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (bookingData.status !== "PENDING") {
      return res.status(400).json({ message: "Booking cannot be accepted" });
    }

    bookingData.status = "ACCEPTED";
    bookingData.meetingLink = meetingLink;
    bookingData.acceptedAt = new Date();
    await bookingData.save();

    // ✅ create session
    const startTime = bookingData.pickedDateTime;

    const endTime = new Date(
      startTime.getTime() + bookingData.duration * 60000
    );

    await Session.create({
      booking: bookingData._id,
      title: bookingData.skill,
      startTime,
      endTime,
      duration: bookingData.duration,
      status: "PLANNED",
      learnerConfirmed: null,
      mentorConfirmed: null,
    });

    return res.status(200).json({
      message: "Booking accepted and session created"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = acceptBooking;