
const otpModel = require('../models/otp');
const userModel = require('../models/user'); 
const { otpVerification } = require('../helpers/otpValidate');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const cDate = new Date();

        const otpDoc = await otpModel.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(cDate.getTime() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            to: phoneNumber,
            from: process.env.PHONE_NUMBER
        });

        return res.status(200).json({
            success: true,
            msg: 'OTP sent successfully! ' + otp
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;


        const otpData = await otpModel.findOne({ phoneNumber, otp });
        if (!otpData) {
            return res.status(400).json({
                success: false,
                msg: 'You entered the wrong OTP!'
            });
        }

       
        const isOtpExpired = otpVerification(otpData.otpExpiration);
        if (!isOtpExpired) {
            return res.status(400).json({
                success: false,
                msg: 'Your OTP has expired!'
            });
        }

        // Find or create the user
        let user = await userModel.findOne({ phoneNumber });
        if (!user) {
            user = new userModel({
                phoneNumber,
                name: 'Guest User' // Default name for new users
            });
            await user.save();
        }

        return res.status(200).json({
            success: true,
            msg: 'OTP verified successfully!',
            user 
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const resendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const otpDoc = await otpModel.findOne({ phoneNumber });
        if (!otpDoc) {
            return res.status(400).json({
                success: false,
                msg: 'No OTP found for this phone number. Please request a new OTP.'
            });
        }

     
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const cDate = new Date();
        otpDoc.otp = otp;
        otpDoc.otpExpiration = new Date(cDate.getTime() + 5 * 60 * 1000); // Set expiration time (5 minutes)
        await otpDoc.save();

        
        await twilioClient.messages.create({
            body: `Your new OTP is: ${otp}`,
            to: phoneNumber,
            from: process.env.PHONE_NUMBER
        });

        return res.status(200).json({
            success: true,
            msg: 'New OTP sent successfully! ' + otp
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    sendOtp,
    verifyOtp,
    resendOtp
};
