const booking = require("../../models/booking.model");
const Session = require("../../models/sessions.model");

const updateBookingController = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { newDate, newTime } = req.body;

    const bookingData = await booking.findById(bookingId);
    if (!bookingData) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const newDateTime = new Date(`${newDate}T${newTime}`);

    bookingData.pickedDateTime = newDateTime;
    await bookingData.save();

    const sessionData = await Session.findOne({ booking: bookingId });

    if (sessionData) {
      sessionData.startTime = newDateTime;
      sessionData.endTime = new Date(
        newDateTime.getTime() + bookingData.duration * 60000
      );
      await sessionData.save();
    }

    return res.status(200).json({
      message: "Booking and session updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = updateBookingController;