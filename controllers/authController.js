const userModel = require('../models/user'); 

const logout = async (req, res) => {
    try {
        const { userId } = req.body; 
       
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User not found!'
            });
        }

       
        return res.status(200).json({
            success: true,
            msg: 'Logged out successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    logout
};

