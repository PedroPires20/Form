const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const { sequelize, associations } = require("./sequelize")

const usersController = require("./modules/users/controller")
const formsController = require("./modules/forms/controller")

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected")
    associations.apply()
    sequelize.sync({ force: false }).then(() => console.log("Database Synced"))
  })
  .catch((err) => console.log("Error connecting to database", err))

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({ origin: "http://localhost:8080" }))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "dist")))

app.use("/users", usersController)
app.use("/forms", formsController)

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

app.listen(PORT, () => {
  console.log(`App listening on Local: http://localhost:${PORT}/`)
})
