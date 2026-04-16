const mongoose = require("mongoose");

const sessionsSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: true,
        index: true
    },

    title: String,

    startTime: {
        type: Date,
        required: true
    },

    endTime: {
        type: Date,
        required: true
    },

    duration: {
        type: Number, // in minutes
        required: true
    },

    status: {
        type: String,
        enum: ["PLANNED", "LIVE", "DONE"],
        default: "PLANNED",
        index: true
    },
    learnerConfirmed: {
      type: Boolean,
      default: false,
    },
    mentorConfirmed: {
      type: Boolean,
      default: false,
    },

    notes: String

}, { timestamps: true });

module.exports = mongoose.model("sessions", sessionsSchema);