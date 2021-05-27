const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const { passport: passportMiddleware } = require('./middleware');
const { date: {
  subtractDaysFromToday, friendlyTimeAndDate
}} = require('./utils');

require('dotenv').config();

const app = express();
// db setup
const db = require('./services/db.service');
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
  console.log('\nSuccessfully connected to Mongo!\n');
});

// view engine setup
const exphbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          '+': lvalue + rvalue,
          '-': lvalue - rvalue,
          '*': lvalue * rvalue,
          '/': lvalue / rvalue,
          '%': lvalue % rvalue,
        }[operator];
      },
      dateRange: function (start, end) {
        const startDate = new Date(subtractDaysFromToday(parseInt(start)));
        const endDate = new Date(subtractDaysFromToday(parseInt(end)));
        const sMonth = startDate.getMonth() + 1;
        const sDay = startDate.getDate();
        const sYear = startDate.getFullYear();
        const eMonth = endDate.getMonth() + 1;
        const eDay = endDate.getDate();
        const eYear = endDate.getFullYear();
        return `${sMonth}/${sDay}/${sYear} - ${eMonth}/${eDay}/${eYear}`;
      },
      friendlyDateTime: function (date) {
        const [
          friendlyDate,
          friendlyTime
        ] = friendlyTimeAndDate(new Date(date));
        return `${friendlyDate} @ ${friendlyTime}`;
      },
    },
  })
);
app.set('view engine', 'hbs');
// Enable CORS globally for now
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

passportMiddleware(app);

const routes = require('./routes');
app.use('/', routes);

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
