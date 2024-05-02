// not being utilized at the moment
const { sequelize } = require("../../server/util/database");

const Pokemon = sequelize.define("pokemon", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pokemonId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  abilities: Sequelize.ARRAY(Sequelize.STRING),
  stats: Sequelize.JSON,
  types: Sequelize.ARRAY(Sequelize.STRING),
  userId: Sequelize.INTEGER,
});

module.exports = {
  Pokemon,
};
