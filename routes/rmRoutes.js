const express = require('express');
const router = express.Router();
const { addRM, getRM, updateRM, deleteRM } = require('../controllers/rmController');

router.post('/rm/add', addRM);
router.get('/rm', getRM);
router.put('/rm/update/:id', updateRM);
router.delete('/rm/delete/:id', deleteRM);

module.exports = router;
