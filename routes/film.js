const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request');
const filmData = require("../middleware/film-data");

router.get('/:title', filmData,
    async(req, res) => {
        var link = '';
        var title = '';
        var year = '';
        var time = '';
        const myJSON = req.filmData;
        try {
            link = myJSON.results[0].image.url;
            title = myJSON.results[0].title;
            year = myJSON.results[0].year;
            time = myJSON.results[0].runningTimeInMinutes;
        } catch (error) {
            console.log('error to get data');
        }


        res.status(200).render('pages/film', {
            img_link: link,
            title: title,
            year: year,
            time: time,
            description: 'здесь могло быть описание',
        })
    });

module.exports = router;