const { Sequelize } = require("sequelize")
let sequelize;

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
} else {
  console.log("-------- development -----------")
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
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

module.exports = {
  sequelize,
  associations: mkAssociations(),
}
