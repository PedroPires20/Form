const { Sequelize } = require("sequelize")
const fs = require("fs")
const path = require("path")
let sequelize

if (process.env.NODE_ENV === "production") {
  console.log("-------- production -----------")
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  })
} else if (process.env.NODE_ENV === "development") {
  console.log("-------- development -----------")
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./development.sqlite",
    logging: false,
  })
} else {
  console.log("-------- test -----------")
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./test.sqlite",
    logging: false
  })
}

function mkAssociations() {
  const associations = []
  return {
    assign: function (association) {
      associations.push(association)
    },
    apply: function () {
      associations.forEach((assoc) => assoc(sequelize.models))
    },
  }
}

function importModels() {
  const modules = fs.readdirSync(path.resolve(__dirname, "modules"))
  return modules.map((module) =>
    require(path.resolve(__dirname, "modules", module, "model"))
  )
}

module.exports = {
  sequelize,
  importModels,
  associations: mkAssociations(),
}
