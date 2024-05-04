const { Post } = require("../models/post");
const { User } = require("../models/user");
const axios = require("axios");

module.exports = {
  addPost: async (req, res) => {
    try {
      // Get a random Pokemon ID between 1 and 151 (for the original Pokemon)
      const pokemonId = Math.floor(Math.random() * 151) + 1;

      // Make a GET request to the Poke API
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      // Get the Pokemon's name, height, weight, and picture
      const { name, height, weight, sprites } = response.data;

      // Create a new post with the Pokemon's name as the title and the Pokemon's details as the content
      let { status, userId } = req.body;
      let title = name;
      let content = `Height: ${height}, Weight: ${weight}, Picture: ${sprites.front_default}`;
      await Post.create({ title, content, userId, privateStatus: status });

      res.status(200);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
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
      console.log("ERROR IN getAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  getCurrentUserPosts: async (req, res) => {
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
      console.log("ERROR IN getCurrentUserPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
