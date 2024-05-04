const { Post } = require("../models/post");
const { User } = require("../models/user");
const axios = require("axios");

module.exports = {
  addRandomPokemon: async (req, res) => {
    const numOfPokemon = 151;

    try {
      const pokemonId = Math.floor(Math.random() * numOfPokemon) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const { name, height, weight, sprites } = response.data;
      let { status, userId } = req.body;
      let content = `Name: ${name}, Height: ${height}, Weight: ${weight}`;
      await Post.create({ name, content, userId, privateStatus: status });

      res.status(200);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },

  getUsersPokemon: async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await Post.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log("ERROR IN getUsersPokemon");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
