const privacyPolicyModel = require('../models/privacyPolicyModel');


const addOrUpdatePrivacyPolicy = async (req, res) => {
    try {
        const { content } = req.body;

        let privacyPolicy = await privacyPolicyModel.findOne();

        if (privacyPolicy) {
            privacyPolicy.content = content;
            privacyPolicy.lastUpdated = Date.now();
        } else {
            privacyPolicy = new privacyPolicyModel({
                content
            });
        }

        await privacyPolicy.save();

        return res.status(200).json({
            success: true,
            msg: 'Privacy Policy updated successfully!',
            data: privacyPolicy
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const getPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await privacyPolicyModel.findOne();

        if (!privacyPolicy) {
            return res.status(404).json({
                success: false,
                msg: 'Privacy Policy not found!'
            });
        }

        return res.status(200).json({
            success: true,
            data: privacyPolicy
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const deletePrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await privacyPolicyModel.findOneAndDelete();

        if (!privacyPolicy) {
            return res.status(404).json({
                success: false,
                msg: 'Privacy Policy not found!'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Privacy Policy deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
module.exports = {
    addOrUpdatePrivacyPolicy,
    getPrivacyPolicy,
    deletePrivacyPolicy
};
