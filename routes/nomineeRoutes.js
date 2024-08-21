const express = require('express');
const { addNominee, getNominee, deleteNominee, updateNominee } = require('../controllers/nomineecontroller');
const router = express.Router();


router.post('/nominee/add', addNominee);
router.get('/nominee/:userId', getNominee);
router.put('/nominee/update/:userId', updateNominee);
router.delete('/nominee/delete/:userId', deleteNominee);

module.exports = router;
