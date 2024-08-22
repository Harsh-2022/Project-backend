const express = require('express');
const {updateRole} = require('../../controllers/profileController')
const router = express.Router();

router.post('/profile/change-role/:id', updateRole)

module.exports = router;