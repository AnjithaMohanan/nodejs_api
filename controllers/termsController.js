const termsModel = require('../models/termsModel');

// Add or Update Terms and Conditions
const addOrUpdateTerms = async (req, res) => {
    try {
        const { content } = req.body;

        let terms = await termsModel.findOne();

        if (terms) {
            terms.content = content;
            terms.lastUpdated = Date.now();
        } else {
            terms = new termsModel({
                content
            });
        }

        await terms.save();

        return res.status(200).json({
            success: true,
            msg: 'Terms and Conditions updated successfully!',
            data: terms
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const getTerms = async (req, res) => {
    try {
        const terms = await termsModel.findOne();

        if (!terms) {
            return res.status(404).json({
                success: false,
                msg: 'Terms and Conditions not found!'
            });
        }

        return res.status(200).json({
            success: true,
            data: terms
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
const deleteTerms = async (req, res) => {
    try {
        const terms = await termsModel.findOneAndDelete();

        if (!terms) {
            return res.status(404).json({
                success: false,
                msg: 'Terms and Conditions not found!'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Terms and Conditions deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    addOrUpdateTerms,
    getTerms,
    deleteTerms
};
