const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

const request = require('request');



router.get('/:title',
    async(req, res) => {
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/find',
            qs: { q: req.params.title },
            headers: {
                'x-rapidapi-key': '7537ed0107msh5efeb020733e8fap10c973jsn615d8c0918bc',
                'x-rapidapi-host': 'imdb8.p.rapidapi.com',
                useQueryString: true
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);

            var link = '';
            var title = '';
            var year = '';
            var time = '';
            const myJSON = JSON.parse(body);
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
    });

module.exports = router;