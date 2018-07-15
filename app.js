const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const app = express()

const sequelize = require('./services/database');
sequelize.sync({ force: false, logging: false }).then(() => console.log('Table has been created'));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'SI_BANDARA_JOS'
}))

// app.use((req, res, next) => {
//   if (req.session.hasLogin && req.originalUrl === '/login') {
//     res.redirect('/')
//   } else if (req.originalUrl !== '/login' && !req.session.hasLogin) {
//     res.redirect('/login')
//   }

//   next()
// })

app.use('/', require('./routes/index'))
app.use('/petugas', require('./routes/petugas'))
app.use('/maskapai', require('./routes/maskapai'))
app.use('/bandara', require('./routes/bandara'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
