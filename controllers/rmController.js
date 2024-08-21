const rmModel = require('../models/rmModel');

// Add a new Relationship Manager
const addRM = async (req, res) => {
    try {
        const { name, phoneNumber, email } = req.body;

        const rmEntry = new rmModel({
            name,
            phoneNumber,
            email
        });

        await rmEntry.save();

        return res.status(200).json({
            success: true,
            msg: 'Relationship Manager added successfully!',
            data: rmEntry
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const getRM = async (req, res) => {
    try {
        const rmData = await rmModel.find();

        return res.status(200).json({
            success: true,
            data: rmData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const updateRM = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, email } = req.body;

        const updatedRM = await rmModel.findByIdAndUpdate(
            id,
            { name, phoneNumber, email },
            { new: true }
        );

        if (!updatedRM) {
            return res.status(404).json({
                success: false,
                msg: 'Relationship Manager not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Relationship Manager updated successfully!',
            data: updatedRM
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const deleteRM = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRM = await rmModel.findByIdAndDelete(id);

        if (!deletedRM) {
            return res.status(404).json({
                success: false,
                msg: 'Relationship Manager not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Relationship Manager deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    addRM,
    getRM,
    updateRM,
    deleteRM
};
