
const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');


router.post('/add', bankController.addBankAccount);

router.get('/:userId', bankController.getBankAccounts);

router.put('/update/:id', bankController.updateBankAccount);

router.delete('/delete/:id', bankController.deleteBankAccount);

module.exports = router;
