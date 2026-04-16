const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    skill: { type: String, required: true, index: true },
    credits: { type: Number, required: true, min: 1 },

    meetingLink: { type: String },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "SCHEDULED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    // 🔥 SINGLE DATE FIELD
    pickedDateTime: { type: Date, required: true },

    duration: { type: Number, required: true, min: 1 },

    rating: { type: Number, min: 1, max: 5 },
    learnerFeedback: { type: String },
    mentorFeedback: { type: String },

    requestedAt: { type: Date, default: Date.now },
    acceptedAt: Date,
    scheduledAt: Date,
    completedAt: Date,

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },

    escrowTxn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);