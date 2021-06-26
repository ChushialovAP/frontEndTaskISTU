// Filename : user.js

const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup", [
        check("uname", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("psw", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                b: req.body,
                errors: errors.array()
            });
        }

        const username = req.body.uname;
        const password = req.body.psw;
        try {
            let user = await User.findOne({
                username
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
                //res.writeHead(302, { 'Location': '/login' });
                //res.end();
            }

            user = new User({
                username,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
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
                        token
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

module.exports = router;