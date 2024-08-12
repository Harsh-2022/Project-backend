const express = require ("express");
const cors = require("cors");
const {test,registerUser, loginUser,getProfile} = require("../controllers/authController")
const {validateRegistration} = require("../middleware/userValidation")

const router = express.Router();

router.get('/',test)

router.post('/register',validateRegistration,registerUser)

router.post('/login',loginUser)

router.get('/profile',getProfile)

module.exports = router;
