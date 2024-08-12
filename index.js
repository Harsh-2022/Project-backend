const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes")

const app = express(); 
const port = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/',authRoute)

//
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(() => {
    console.log("Connection Failed");
})

