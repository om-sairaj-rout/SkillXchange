const Session = require("../../models/sessions.model");
const Booking = require("../../models/booking.model");
const User = require("../../models/user.model");

const confirmSessionCompletion = async (req, res) => {
  try {
    const { sessionId, userId } = req.params;
    const { confirmed, rating, feedback } = req.body; 

    const session = await Session.findById(sessionId).populate("booking");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const booking = await Booking.findById(session.booking._id).populate("escrowTxn");

    // Identify user role and update feedback in Booking document
    if (session.booking.learner.toString() === userId) {
      session.learnerConfirmed = confirmed;
      booking.learnerFeedback = feedback;
      booking.rating = rating; 
    } else if (session.booking.mentor.toString() === userId) {
      session.mentorConfirmed = confirmed;
      booking.mentorFeedback = feedback;
    }

    await session.save();
    await booking.save();

    // Final Settlement Logic: Release credits and update Mentor stats
    if (session.learnerConfirmed && session.mentorConfirmed) {
      booking.status = "COMPLETED";
      booking.completedAt = new Date();
      await booking.save();

      if (booking.escrowTxn) {
        booking.escrowTxn.status = "RELEASED";
        await booking.escrowTxn.save();

        const mentor = await User.findById(booking.mentor);
        mentor.credits += booking.credits;
        
        // Update Mentor Rating and Reviews array
        if (rating) {
            mentor.reviews.push({ comment: feedback, stars: rating });
            const totalStars = mentor.reviews.reduce((acc, curr) => acc + curr.stars, 0);
            mentor.rating = totalStars / mentor.reviews.length;
        }

        mentor.completedSessions += 1;
        await mentor.save();
      }
    } 
    // Refund Logic
    else if (session.learnerConfirmed === false || session.mentorConfirmed === false) {
      booking.status = "CANCELLED";
      await booking.save();

      if (booking.escrowTxn) {
        booking.escrowTxn.status = "REFUNDED";
        await booking.escrowTxn.save();

        const learner = await User.findById(booking.learner);
        learner.credits += booking.credits;
        await learner.save();
      }
    }

    return res.status(200).json({ message: "Recorded successfully", session });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = confirmSessionCompletion;