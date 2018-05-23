var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://root:root@ds016118.mlab.com:16118/drivingschool';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('debug', true);

var indexRouter = require('./src/routes/index');
var apiRouter = require('./src/routes/api');

var studentRouter = require('./src/routes/student');
var instructorRouter = require('./src/routes/instructor');
var adminRouter = require('./src/routes/admin');
var anonymousRouter = require('./src/routes/anonymous');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/student', studentRouter);
app.use('/instructor', instructorRouter);
app.use('/admin', adminRouter);
app.use('/anonymous', anonymousRouter);

module.exports = app;
