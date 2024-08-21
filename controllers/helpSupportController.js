const messageModel = require('../models/messageModel');

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        const newMessage = new messageModel({
            senderId,
            receiverId,
            message
        });

        await newMessage.save();

        return res.status(200).json({
            success: true,
            msg: 'Message sent successfully!',
            data: newMessage
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const { userId, supportAgentId } = req.params;

        const messages = await messageModel.find({
            $or: [
                { senderId: userId, receiverId: supportAgentId },
                { senderId: supportAgentId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 }); // Sort by timestamp to get the conversation in order

        return res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        const updatedMessage = await messageModel.findByIdAndUpdate(
            id,
            { message },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({
                success: false,
                msg: 'Message not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Message updated successfully!',
            data: updatedMessage
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMessage = await messageModel.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({
                success: false,
                msg: 'Message not found.'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Message deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage,
    updateMessage
};
