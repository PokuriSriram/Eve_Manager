const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('./Models/User');

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB cloud connected successful")
})
    .catch((error) => {
        console.log("MongoDB connection Failed! ", error)
    });

app.get("/", (req, res) => {
    res.send("Backend Running Successful")
});

app.post("/api/register", async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body;
        const existingUser = await User.findOne({ phone: phone });

        if (existingUser) {
            return res.status(400).json({
                message: "Phonenumber already Registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
            phone: phone,
        });
        await newUser.save();
        res.status(201).json({
            message: "Registration Successful"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Registration Failed..!",
            error: error.message
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { phone, password } = req.body;

        const existingUser = await User.findOne({ phone });

        if (!existingUser) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const haspasswordmatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!haspasswordmatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                phone: existingUser.phone
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                fullname: existingUser.fullname,
                phone: existingUser.phone
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login Failed",
            error: error.message
        });
    }
});


app.post();


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})