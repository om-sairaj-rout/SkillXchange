const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ['ESCROW_HOLD', 'RELEASE_TO_MENTOR', 'REFUND_TO_LEARNER'], required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'booking', index: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['HELD', 'RELEASED', 'REFUNDED'], default: 'HELD' },
},{ timestamps: true });

const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction; 