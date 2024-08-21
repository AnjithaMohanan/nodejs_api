const mongoose = require('mongoose');

const ekycSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },
    panCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    whatYouDo: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('EKYC', ekycSchema);
