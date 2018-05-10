const express = require('express');
const app = express();
const fetch = require('node-fetch');

var launchlibrary = 'https://launchlibrary.net/1.3/launch/next/';

app.use(express.static(__dirname + '/public'));

app.get('/launch/:number', async function (req, response) {
    let url = launchlibrary + req.params.number;
    let result = await getData(url);
    response.send(result);
})

app.get('/dayfact', async function (req, response) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let url = `http://numbersapi.com/${month}/${day}/date`;
    let result = await getText(url);
    response.send(result);
})

app.get('/isslocation', async function (req, response) {
    let url = 'http://api.open-notify.org/iss-now.json';
    let result = await getData(url);
    response.send(result);
})

app.get('/isspeople', async function (req, response) {
    let url = 'http://api.open-notify.org/astros.json';
    let result = await getData(url);
    response.send(result);
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

async function getData(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

async function getText(url) {
    const res = await fetch(url);
    const text = await res.text();
    return text;
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
