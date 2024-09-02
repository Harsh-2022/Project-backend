const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes")
const profileRouter = require("./routes/profileRoutes") 


const app = express(); 
dotenv.config();

app.use(express.json());
app.use(cors({credentials: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=> {
    res.send("Welcome!")
})

app.use('/auth',authRouter)
app.use('/profile',profileRouter)



//Connect to database and start the server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Connection Failed");
    console.log(err);
})

