const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static(__dirname + '/public'));

app.get('/launch/:number', async function (req, response) {
    let result = await getLaunches(req.params.number).catch((err) => next(err));
    response.send(result);
})

app.get('/dayfact', async function (req, response) {
    let result = await getDayFact().catch((err) => next(err));
    response.send(result);
})

app.get('/isslocation', async function (req, response) {
    let result = await getISSLocation().catch((err) => next(err));
    response.send(result);
})

app.get('/isspeople', async function (req, response) {
    let result = await getISSPeople().catch((err) => next(err));
    response.send(result);
})

app.get('/package', async function(req, response) {
    try {
        response.send({
            launches: await getLaunches(5),
            dayfact: await getDayFact(),
            issLocation: await getISSLocation(),
            issPeople: await getISSPeople()
        });
    }
    catch(err) {
        next(err);
    }
})

app.use(logErrors);
app.use(errorHandler);

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

async function getLaunches(number) {
    let url = 'https://launchlibrary.net/1.3/launch/next/' + number;
    let data = await getData(url);
    let result = [];
    data.launches.forEach(launch => {
        result.push({
            name: launch.name,
            status: launch.status,
            start: launch.windowstart,
            end: launch.windowend,
            info: launch.infoURLs,
            vids: launch.vidURLs,
            location: launch.location.name
        });
    });
    return Promise.resolve(result);
}

function getDayFact() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let url = `http://numbersapi.com/${month}/${day}/date`;
    return getText(url);
}

function getISSLocation() {
    let url = 'http://api.open-notify.org/iss-now.json';
    return  getData(url);
}

function getISSPeople() {
    let url = 'http://api.open-notify.org/astros.json';
    return getData(url);
}

function logErrors (err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function errorHandler (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
