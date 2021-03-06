var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
// const MONGO_DB_URLS = 'mongodb://cwaj400:rootuser1@ds223609.mlab.com:23609/webdevsummer2assfour';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://localhost/webdev-summer2-2018');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', ' http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


const userService = require('./services/user.service.server'); //(app);
userService(app);

require('./services/section.service.server')(app);
require('./services/enrollment.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/submission.service.server')(app);
require('./services/question.service.server')(app);

app.listen(process.env.PORT || 3000, () =>
    console.log('Node server started!'));







