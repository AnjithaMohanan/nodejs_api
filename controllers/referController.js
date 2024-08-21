const shareReferral = async (req, res) => {
    try {
        const { userId } = req.body; 

      
        const referralLink = `${process.env.BASE_URL}/referral/${userId}`;


        return res.status(200).json({
            success: true,
            msg: 'Referral link generated successfully!',
            referralLink
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    shareReferral
};
