const express = require('express');
const Request = require("request");
const app = express();

var launchlibrary = 'https://launchlibrary.net/1.3/launch/next/';

app.get('/launch/:number', (req, response) => {
    let url = launchlibrary + req.params.number;
    Request.get(url, (error, resp, body) => {
        if(error) next(error);
        response.send(JSON.parse(body));
    });
})

app.get('/dayfact', (req, response) => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let url = `http://numbersapi.com/${month}/${day}/date`;
    Request.get(url, (error, resp, body) => {
        if(error) next(error);
        response.send({message: body});
    });
})

app.get('/isslocation', (req, response) => {
    let url = 'http://api.open-notify.org/iss-now.json?callback=?';
    Request.get(url, (error, resp, body) => {
        if(error) next(error);
        response.send(parseISSResponse(body));
    });
})

app.get('/isspeople', (req, response) => {
    let url = 'http://api.open-notify.org/astros.json?callback=?';
    Request.get(url, (error, resp, body) => {
        if(error) next(error);
        response.send(parseISSResponse(body));
    });
})

app.use(logErrors);
app.use(errorHandler);

function logErrors (err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function errorHandler (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

function parseISSResponse(response) {
    return JSON.parse(response.substring(2, response.length - 1));
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
