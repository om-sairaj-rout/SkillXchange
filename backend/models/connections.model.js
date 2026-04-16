const mongoose = require('mongoose');

const connectionsSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true },
    acceptedAt: { type: Date},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const connections = mongoose.model('connections', connectionsSchema);

module.exports = connections;  