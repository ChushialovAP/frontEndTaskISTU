window.addEventListener("load", function(event) {
    for (let i = 0; i < 4; i++) {
        setData(i);
    };
}, false);

const IDs = ["4154796", "0417299", "1270797", "6320628"];

function setData(id) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt" + IDs[id] + "&r=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "7537ed0107msh5efeb020733e8fap10c973jsn615d8c0918bc",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function(response) {
        $('#card' + (id + 1) + '-href').attr('href', "/film/" + response.Title);
        $('#card' + (id + 1) + ' .card-image').append("<img width='280px' height='370px' src=" + response.Poster + " />");
        $('#card' + (id + 1) + ' .card-image-text').append("<p>" + response.Plot + "</p>");
        $('#card' + (id + 1) + ' .card-name').append("<p>" + response.Title + "</p>");
    });
}