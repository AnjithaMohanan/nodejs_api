
const Bank = require('../models/Bank');

const addBankAccount = async (req, res) => {
    const { userId, accountHolderName, accountNumber, ifscCode } = req.body;

    try {
        const newBank = new Bank({
            userId,
            accountHolderName,
            accountNumber,
            ifscCode
        });

        const savedBank = await newBank.save();
        res.status(201).json(savedBank);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add bank account.' });
    }
};

const getBankAccounts = async (req, res) => {
    try {
        const banks = await Bank.find({ userId: req.params.userId });
        res.status(200).json(banks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bank accounts.' });
    }
};

const updateBankAccount = async (req, res) => {
    const { accountHolderName, accountNumber, ifscCode } = req.body;

    try {
        const updatedBank = await Bank.findByIdAndUpdate(
            req.params.id,
            { accountHolderName, accountNumber, ifscCode },
            { new: true }
        );
        res.status(200).json(updatedBank);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bank account.' });
    }
};

const deleteBankAccount = async (req, res) => {
    try {
        await Bank.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Bank account deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bank account.' });
    }
};

module.exports = {
    addBankAccount,
    getBankAccounts,
    updateBankAccount,
    deleteBankAccount
};
