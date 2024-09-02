const express = require('express');
const { verifyToken } = require('../middleware/userAuth');
const { getProfile, updateRole } = require('../controllers/profileController')

const router = express.Router();

router.use(verifyToken)

router.route('/').get(getProfile);

router.post('/change-role/:id', updateRole)

module.exports = router;

