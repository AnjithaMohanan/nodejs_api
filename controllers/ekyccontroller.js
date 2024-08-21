const ekycModel = require('../models/ekyc');

const addEkycDetails = async (req, res) => {
    try {
        const { userId, aadhaarNumber, panCardNumber, dob, gender, permanentAddress,whatYouDo } = req.body;

        const ekycDetails = new ekycModel({
            userId,
            aadhaarNumber,
            panCardNumber,
            dob,
            gender,
            permanentAddress,
            whatYouDo
        });

        await ekycDetails.save();

        return res.status(200).json({
            success: true,
            msg: 'eKYC details added successfully!',
            data: ekycDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getEkycDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const ekycDetails = await ekycModel.findOne({ userId });

        if (!ekycDetails) {
            return res.status(404).json({
                success: false,
                msg: 'No eKYC details found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            data: ekycDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const updateEkycDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const { aadhaarNumber, panCardNumber, dob, gender, permanentAddress,whatYouDo } = req.body;

        const updatedDetails = await ekycModel.findOneAndUpdate(
            { userId },
            { aadhaarNumber, panCardNumber, dob, gender, permanentAddress,whatYouDo },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            msg: 'eKYC details updated successfully!',
            data: updatedDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
const deleteEkycDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedDetails = await ekycModel.findOneAndDelete({ userId });

        if (!deletedDetails) {
            return res.status(404).json({
                success: false,
                msg: 'No eKYC details found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'eKYC details deleted successfully!',
            data: deletedDetails
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


module.exports = {
    addEkycDetails,
    getEkycDetails,
    updateEkycDetails,
    deleteEkycDetails
};
