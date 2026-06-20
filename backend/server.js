const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('./Models/User');
const Event = require('./Models/Event');

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


app.post("/api/events", async (req, res) => {
    try {
        const { Eventimage, Title, Description } = req.body;

        if (!Eventimage || !Title || !Description) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newEvent = new Event({
            Eventimage,
            Title,
            Description
        });

        await newEvent.save();

        res.status(201).json({
            message: "Event added successfully",
            event: newEvent,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add Event",
            error: error.message,
        });
    }
});

app.get("/api/events", async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json(
            {
                message: "Failed to fetch events",
                error: error.message,
            }
        );
    }
});

app.put("/api/events/:id", async (req, res) => {
    try {
        const { Eventimage, Title, Description } = req.body;
        const updateEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                Eventimage,
                Title,
                Description,
            },
            {
                new: true,
            }
        );

        if (!updateEvent) {
            return res.status(400).json(
                {
                    message: "Event not found"
                }
            );
        }
        res.status(200).json({
            message: "Event Updated"

        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update Event",
            error: error.message
        });
    }
});


app.delete("/api/events/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not Found!"
            });
        }
        res.status(200).json({
            message: "Event Deleted Successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to Delete Event",
            error: error.message,
        });
    }
});


app.get("/api/event-count", async (req, res) => {
    try {
        const count = await Event.countDocuments();

        res.status(200).json({
            totalEvents: count,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to count courses",
            error: error.message,
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})