const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request');
const Comment = require("../model/Comment");

router.post('/add', async(req, res) => {
    const {
        username,
        title,
        bodyText
    } = req.body;
    try {
        let comment = new Comment({
            username,
            title,
            bodyText
        });

        await comment.save();
        console.log('saved comment');
        res.status(200).send(comment);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});

module.exports = router;