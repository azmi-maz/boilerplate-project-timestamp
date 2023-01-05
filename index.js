// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const request = req.params.date;
  const toMilliSecs = new Date(request).getTime();
  if (isNaN(toMilliSecs) === false) {
    res.json({"unix": toMilliSecs, "utc": new Date(toMilliSecs)});
  } else {
    const utcDate = new Date(Number(request))
    res.json({"unix": request, "utc": utcDate});

    
    // return { error : "Invalid Date" };
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
