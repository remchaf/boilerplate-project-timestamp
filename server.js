// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
console.log('Hello Estella')
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Endpoint for req w/ valid params
app.get('/api/:date', (req, res) => {
  let date = req.params.date;

  const d = (d) => ({
    unix: new Date(d).getTime(),
    utc: new Date(d).toUTCString()
  })

  if( /^(\d+)$/.test(date) ) {
    res.json(d( Number(date) ))
    console.log('Milliseconds :'+date)
  }
  else if( new Date(date).getTime() ) {
    res.json( d(date) );
    console.log('Date object :'+date)
  }
  else {
    res.json(
      {
        'error': 'Invalid Date'
      }
    );
    console.log('Invalid Date! : '+date)
  }
  
})

// For a request on /api with empty parameter
app.get('/api/', (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
