const booking = require("../../models/booking.model");
const sessions = require("../../models/sessions.model");
const user = require("../../models/user.model");

const completedBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const bookingData = await booking.findById(bookingId).populate('escrowTxn');
        if (!bookingData) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (bookingData.status !== "ACCEPTED" && bookingData.status !== "SCHEDULED") {
            return res.status(400).json({ message: "Booking cannot be completed" });
        }

        bookingData.status = "COMPLETED";
        bookingData.completedAt = new Date(); 
        await bookingData.save();

        if (bookingData.escrowTxn) {
            bookingData.escrowTxn.status = "RELEASED";
            bookingData.escrowTxn.type = "RELEASED_TO_MENTOR";
            await bookingData.escrowTxn.save();

            const mentorUser = await user.findById(bookingData.mentor);
            mentorUser.credits += bookingData.credits;
            await mentorUser.save();
        }

        const session = await sessions.create({
            booking: booking._id,
            title: `Session for ${booking.skill}`,
            startTime: booking.acceptedAt || new Date(), // fallback if acceptedAt not set
            endTime: new Date(), // session completed now
            status: "DONE",
            notes: "", // optional: can be filled later
        });

        return res.status(200).json({ message: "Booking completed and session recorded", booking: bookingData, session });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = completedBooking;