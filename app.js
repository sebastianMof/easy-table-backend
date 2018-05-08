const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const mesaRouter = require('./routes/mesa');
const reservaRouter = require('./routes/reserva');
const usuarioRouter = require('./routes/usuario');

//--------Testing
//const reservRouter = require('./routes//reserva');
const fechaRouter = require('./routes/routes_reserva/fecha2');
const test = require('./routes/routes_reserva/verificarMesa');
//--------
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mesa', mesaRouter);
app.use('/reserva', reservaRouter);
app.use('/usuario', usuarioRouter);

//-------testing
//app.use('/reserva', reservRouter);
app.use('/fecha2', fechaRouter);
app.use('/test',test);

//-------


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
