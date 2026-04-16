const booking = require("../../models/booking.model");
const transaction = require("../../models/transaction.model");
const user = require("../../models/user.model");

const createBooking = async (req, res) => {
  try {
    const {
      learner,
      mentor,
      skill,
      credits,
      pickedDate,
      pickedTime,
      duration,
    } = req.body;

    if (
      !learner ||
      !mentor ||
      !skill ||
      !credits ||
      !pickedDate ||
      !pickedTime ||
      !duration
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const learnerUser = await user.findById(learner);
    if (!learnerUser)
      return res.status(404).json({ message: "Learner not found" });

    if (learnerUser.credits < credits)
      return res.status(400).json({ message: "Not enough credits" });

    // 🔥 COMBINE DATE + TIME INTO SINGLE DATE OBJECT
    const pickedDateTime = new Date(`${pickedDate}T${pickedTime}`);

    // ESCROW TRANSACTION
    const escrowTxn = await transaction.create({
      type: "ESCROW_HOLD",
      booking: null,
      fromUser: learner,
      toUser: mentor,
      amount: credits,
      status: "HELD",
    });

    const newBooking = await booking.create({
      learner,
      mentor,
      skill,
      credits,
      pickedDateTime,
      duration,
      status: "PENDING",
      escrowTxn: escrowTxn._id,
    });

    escrowTxn.booking = newBooking._id;
    await escrowTxn.save();

    learnerUser.credits -= credits;
    await learnerUser.save();

    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
      transaction: escrowTxn,
    });
  } catch (error) {
    console.log("CREATE BOOKING ERROR:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = createBooking;