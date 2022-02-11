const { Sequelize } = require('sequelize');

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "production"){
  console.log("-------- production -----------")
} else {
  console.log("-------- development -----------")
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

function mkAssociations() {
  const associations = []
  return {
    assign: function (association) {
      associations.push(association)
    },
    apply: function () {
      associations.forEach(assoc => assoc(sequelize.models))
    }
  }
}

module.exports = {
  sequelize,
  associations: mkAssociations()
}
