const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../../models/User");

router.get("/list", async (req, res) => {
    const users = await User.find();
    return res.json({ data: users });
});

router.post("/new", async (req, res) => {
    const user = req.body;

    console.log(req.body);

    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email});

    if (takenUsername || takenEmail) {
        res.status(400).json({message: 'Username or email has already been taken'});
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email,
            password: user.password,
            role: 'user'
        });

        dbUser.save();
        res.json({ data: dbUser });
    }
});


module.exports = router;
