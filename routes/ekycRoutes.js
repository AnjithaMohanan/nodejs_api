const express = require('express');
const { addEkycDetails, getEkycDetails, updateEkycDetails, deleteEkycDetails } = require('../controllers/ekyccontroller');
const router = express.Router();


router.post('/ekyc/add', addEkycDetails);
router.get('/ekyc/:userId', getEkycDetails);
router.put('/ekyc/update/:userId', updateEkycDetails);
router.delete('/ekyc/:userId', deleteEkycDetails);

module.exports = router;
