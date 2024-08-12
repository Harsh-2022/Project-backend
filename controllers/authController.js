const User = require("../models/user")
const { hashPassword, comparePassword } = require("../helpers/auth")
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator")

const test = (req, res) => {
    res.send("hey");
};

const registerUser = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, mobile, password } = req.body;

        //check email not exists already
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                msg: "User already exists with this email"
            })
        }

        const hashedPassword = await hashPassword(password);

        //create user in database
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        })

        return res.status(200).json(user)



    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}

//Login route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if User exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                msg: "User Not Found"
            })
        }

        //check if passwords match
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                msg: "Invalid Credentials"
            })

        }

        jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) return console.log(err);

            res.cookie('token', token).json(user);

        })

    } catch (err) {
        console.log(err);
    }
}

const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        res.json(null);
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) return console.log(err);
        res.json(user);
    })
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
}
