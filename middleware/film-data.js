const express = require("express");
const fetch = require('node-fetch');
const request = require('request');


module.exports = function(req, res, next) {
    const movie = req.header("title");
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

        req.filmData = JSON.parse(body);
        next();
    });
}