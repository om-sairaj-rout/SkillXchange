const booking = require("../../models/booking.model");

const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const bookingData = await booking.findById(bookingId).populate('escrowTxn');
        if(!bookingData){
            return res.status(404).json({message: "Booking not found"});
        }

        if(bookingData.status === "COMPLETED" || bookingData.status === "CANCELLED"){
            return res.status(400).json({message: "cannot cancel complted or cancelled booking"});
        }

        bookingData.status = "CANCELLED";  
        await bookingData.save();

        if(bookingData.escrowTxn){
            bookingData.escrowTxn.status = "REFUNDED";
            bookingData.escrowTxn.type = "REFUND_TO_LEARNER";
            await bookingData.escrowTxn.save();
        }

        return res.status(200).json({message: "Booking cancelled and refunded", booking: bookingData});        

    } catch (error) {
        return res.status(500).json({message: "Server Error", error : error.message});
    }
}

module.exports = cancelBooking;