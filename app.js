const express = require('express');
const Request = require("request");
const app = express();

const url = 'https://launchlibrary.net/1.3/launch/next/5';

app.get('/', (req, response) => {
    Request.get(url, (error, resp, body) => {
        if(error) next(error);
        else response.send(JSON.parse(body));
    });
})

app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function errorHandler (err, req, res, next) {
    if(err) res.status(500).send({ error: 'Something failed!' });
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))