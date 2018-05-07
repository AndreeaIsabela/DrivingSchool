var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');
mongoose.set('debug',true);

var indexRouter = require('./src/routes/index');
var apiRouter   = require('./src/routes/api');

var studentRuter=require('./src/routes/student');
var instructorRuter=require('./src/routes/instructor');
var adminRuter=require('./src/routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/student',studentRuter);
app.use('/instructor',instructorRuter);
app.use('/admin',adminRuter);

module.exports = app;
