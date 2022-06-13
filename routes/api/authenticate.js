const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../../models/User");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email }).then((dbUser) => {
        if (!dbUser) {
            return res.status(400).json({ message: "This Email address is not exist" });
        }
        bcrypt.compare(password, dbUser.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: dbUser.id,
                    username: dbUser.username,
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 9000, // 15 mins in seconds
                    },
                    async (err, token) => {
                        res.json({
                            user: dbUser,
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                return res.status(400).json({ message: "Invalid Username or Password" });
            }
        });
    });
});

router.post("/register", async (req, res) => {
    const user = req.body;

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
            role: 'admin'
        });

        dbUser.save();
        res.json(dbUser);
    }
})


module.exports = router;
