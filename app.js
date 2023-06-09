const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const carrerasRouter = require('./routes/carreras');
const materiaRouter = require('./routes/materias');
const aulaRouter = require('./routes/aulas');
const profesorRouter = require('./routes/profesor');
const alumnosRouter = require('./routes/alumnos');
const notasRouter = require('./routes/notas');
const materiaCarreraRouter = require('./routes/materiaCarreras');
const loginRouter = require('./routes/auth');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/login', loginRouter);

app.use('/carrera', carrerasRouter);
// catch 404 and forward to error handler

app.use('/materia', materiaRouter);

app.use('/aula', aulaRouter);
app.use('/profesor', profesorRouter);
app.use('/alumno', alumnosRouter);
app.use('/nota', notasRouter);
app.use('/materiaCarrera', materiaCarreraRouter);
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
