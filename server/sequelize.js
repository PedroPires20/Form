const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
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
