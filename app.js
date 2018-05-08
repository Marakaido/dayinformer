const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

var url = 'http://graph.facebook.com/517267866/?fields=picture';

app.get('/', (req, response) => {
  http.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var fbResponse = JSON.parse(body);
          console.log("Got a response: ", fbResponse);
          response.send(fbResponse)
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
