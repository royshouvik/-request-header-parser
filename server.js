// server.js
// where the node app starts

// init project
var express = require('express');
var app = express();



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (request, response) {
  var ip = request.headers['x-forwarded-for'].split(',')[0] ;
  var locale = request.headers["accept-language"].split(',')[0];
  var software = request.headers['user-agent'];
  var re = /\(([^)]*)\)/ ;
  software = re.exec(software)[1];

  response.send({
    ipaddress : ip,
    language : locale,
    software: software
  });
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
