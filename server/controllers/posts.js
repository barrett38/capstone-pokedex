const { Post } = require("../models/post");
const { User } = require("../models/user");
const axios = require("axios");

module.exports = {
  addPost: async (req, res) => {
    try {
      const pokemonId = Math.floor(Math.random() * 151) + 1;
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
