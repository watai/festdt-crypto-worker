var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// start firebase event handler
var database = require('./routes/database');
database.initialize();
// start crypto object counter
var counter = require('./routes/counter');

// start scheduler
// var schedule = require('./routes/schedule');
// schedule.start();

var indexRouter = require('./routes/index');
var indexFormRouter = require('./routes/form');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/', indexFormRouter);
app.get('/count', cors(), (req, res) => {
  const data = counter.get();
  res.json(data);
  // console.log(JSON.stringify(data));
});
app.get('/del', (req, res) => {
  let num = parseInt(req.query.num, 10);
  database.removeData('crypto', num);
  res.send('Delete ' + num + ' data frome DB');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
