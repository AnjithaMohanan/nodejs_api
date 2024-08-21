const nomineeModel = require('../models/nominee');

const addNominee = async (req, res) => {
    try {
        const { userId, name, relation, phone, email, aadhaarNumber } = req.body;

        const nomineeDetails = new nomineeModel({
            userId,
            name,
            relation,
            phone,
            email,
            aadhaarNumber
        });

        await nomineeDetails.save();

        return res.status(200).json({
            success: true,
            msg: 'Nominee added successfully!',
            data: nomineeDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getNominee = async (req, res) => {
    try {
        const { userId } = req.params;
        const nomineeDetails = await nomineeModel.findOne({ userId });

        if (!nomineeDetails) {
            return res.status(404).json({
                success: false,
                msg: 'No nominee found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            data: nomineeDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const updateNominee = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, relation, phone, email, aadhaarNumber } = req.body;

        const updatedNominee = await nomineeModel.findOneAndUpdate(
            { userId },
            { name, relation, phone, email, aadhaarNumber },
            { new: true }
        );

        if (!updatedNominee) {
            return res.status(404).json({
                success: false,
                msg: 'No nominee found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Nominee updated successfully!',
            data: updatedNominee
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const deleteNominee = async (req, res) => {
    try {
        const { userId } = req.params;

        const nomineeDetails = await nomineeModel.findOneAndDelete({ userId });

        if (!nomineeDetails) {
            return res.status(404).json({
                success: false,
                msg: 'No nominee found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Nominee deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    addNominee,
    getNominee,
    updateNominee,
    deleteNominee
};
