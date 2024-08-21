const faqModel = require('../models/faq');

const addFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const faqEntry = new faqModel({
            question,
            answer
        });

        await faqEntry.save();

        return res.status(200).json({
            success: true,
            msg: 'FAQ added successfully!',
            data: faqEntry
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getFAQs = async (req, res) => {
    try {
        const faqs = await faqModel.find();

        return res.status(200).json({
            success: true,
            data: faqs
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updatedFAQ = await faqModel.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true } 
        );

        if (!updatedFAQ) {
            return res.status(404).json({
                success: false,
                msg: 'FAQ not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'FAQ updated successfully!',
            data: updatedFAQ
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFAQ = await faqModel.findByIdAndDelete(id);

        if (!deletedFAQ) {
            return res.status(404).json({
                success: false,
                msg: 'FAQ not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'FAQ deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
module.exports = {
    addFAQ,
    getFAQs,
    updateFAQ,
    deleteFAQ
};
