const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const { sequelize, associations } = require("./sequelize")

const usersController = require("./modules/users/controller")
const formsController = require("./modules/forms/controller")
const fieldsController = require("./modules/fields/controller")
const optionsController = require("./modules/options/controller")
const resultsController = require("./modules/results/controller")
const User = require("./modules/users/model")

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database Connected")
    associations.apply()
    await sequelize.sync({ force: false }).then(() => console.log("Database Synced"))
    const user = await User.findOne()
    if(!user) {
      await User.create({ username: "baseuser" })
      console.log("Base user created!")
    }
  })
  .catch((err) => console.log("Error connecting to database", err))

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors({ origin: "http://localhost:8080" }))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/../../dist")))

app.use("/users", usersController)
app.use("/forms", formsController)
app.use("/fields", fieldsController)
app.use("/options", optionsController)
app.use("/results", resultsController)

app.get("*", function (_, res) {
  res.sendFile(__dirname + "/../../dist/index.html")
})

// catch 404 and forward to error handler
app.use(function (_, _, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  if (res.headersSent) {
    return next(err)
  }
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send("Request error")
})

app.listen(PORT, () => {
  console.log(`App listening on Local: http://localhost:${PORT}/`)
})
