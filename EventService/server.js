var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Question = require('./api/models/question'),
    Event = require('./api/models/event');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/event');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware

    next();
});

var routes = require('./api/routes/eventRoutes');
routes(app);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, function () {
    console.log('Event Service RESTful API server started on: ' + port);
});