const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
