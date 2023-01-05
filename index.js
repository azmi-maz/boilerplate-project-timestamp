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

function convertDate(dateString) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const day = days[dateString.getDay()]
  const month = months[dateString.getMonth()]
  const date = dateString.getDate()
  const year = dateString.getFullYear()
  const hour = dateString.getHours()
  const minute = dateString.getMinutes()
  const seconds = dateString.getSeconds()
  const combinedDate =
  `${day}, ${date} ${month} ${year} ${hour < 10? "0" + hour : "" + hour}:${minute < 10? "0" + minute : "" + minute}:${seconds < 10? "0" + seconds : "" + seconds} GMT`
  return combinedDate
}

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const request = req.params.date;
  // const request = "";
  const toMilliSecs = new Date(request).getTime();
  const toDateInput = new Date(toMilliSecs);
  const toDateInString = convertDate(toDateInput);
  const utcDate = new Date(Number(request));
  const getUtcDate = utcDate.getTime();
  const convertedDate = convertDate(utcDate);
  
  if (isNaN(toMilliSecs) === false) {
    res.json({"unix": Number(toMilliSecs), "utc": toDateInString});
  } else if (isNaN(toMilliSecs) === true && isNaN(getUtcDate) === false)   {
    res.json({"unix": Number(request), "utc": convertedDate});
  } else if (request === "") {
    res.json({"unix": nowMilli, "utc": nowDate});
  } else {
    res.json({ error : "Invalid Date" });
  }
  
});

// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
