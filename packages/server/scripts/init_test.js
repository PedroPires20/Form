const User = require("../modules/users/model")
const { sequelize, associations, importModels } = require("../sequelize")

importModels()

sequelize
  .authenticate()
  .then(async () => {
    // console.log("Database Connected")
    associations.apply()
    await sequelize.sync({ force: true }).then(() => {
      // console.log("Database Synced")
    })
    const user = await User.findOne()
    if (!user) {
      return User.create({ username: "baseuser" }).then(() => {
        // console.log("Base user created!")
      })
    }
  })
  .catch((err) => console.log("Error connecting to database", err))
