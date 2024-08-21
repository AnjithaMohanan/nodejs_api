
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountHolderName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    ifscCode: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);
