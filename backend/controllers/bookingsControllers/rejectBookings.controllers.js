const booking = require("../../models/booking.model");
const user = require("../../models/user.model");

const rejectBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const bookingData = await booking.findById(bookingId).populate('escrowTxn');
        if(!bookingData){
            return res.status(404).json({message: "Booking not found"});
        }

        if(bookingData.status !== "PENDING"){
            return res.status(400).json({message: "Booking cannot be rejected"});
        }

        bookingData.status = "CANCELLED";
        bookingData.acceptedAt = new Date();        

        await bookingData.save();

        if(bookingData.escrowTxn){
            bookingData.escrowTxn.status = "REFUNDED";
            bookingData.escrowTxn.type = "REFUND_TO_LEARNER";
            await bookingData.escrowTxn.save();

            const learnerUser = await user.findById(bookingData.learner);
            learnerUser.credits += bookingData.credits;
            await learnerUser.save();
        }

        return res.status(200).json({ message: "Booking rejected and refunded", booking : bookingData });

    } catch (error) {
        return res.status(500).json({message: "Server Error", error : error.message});
    }
}

module.exports = rejectBooking;