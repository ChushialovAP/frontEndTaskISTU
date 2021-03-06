// Filename : user.js

const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup", [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const username = req.body.username;
        const password = req.body.password;
        try {
            let user = await User.findOne({
                username
            });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({
                        message: "Incorrect Password !"
                    });
                //res.writeHead(302, { 'Location': '/login' });
                //res.end();
            }

            if (!user) {

                user = new User({
                    username,
                    password
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save();
            }

            const payload = {
                user: {
                    id: user.id,
                    username: username
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        username
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            console.log(username + " " + password);
            res.status(500).send("Error in Saving");
        }
    }
);

router.get("/me", auth, async(req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).send({ message: "Error in Fetching user" });
    }
});

module.exports = router;