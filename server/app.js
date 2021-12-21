var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
var { sequelize } = require("./sequelize")

var usersController = require("./modules/users/controller")

sequelize
  .authenticate()
  .then(() => { 
    console.log("Database Connected")
    sequelize.sync().then(() => console.log("Database Synced"));
  })
  .catch(() => console.log("Error connecting to database"))


var app = express()
app.use(cors({ origin: "http://localhost:8080" }))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "dist")))

app.use('/users', usersController);

app.get("*", function (_, res) {
  res.sendFile(__dirname + "/dist/index.html")
})

// catch 404 and forward to error handler
app.use(function (_, _, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
