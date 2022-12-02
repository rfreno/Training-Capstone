const { Post } = require("../models/post");
const { User } = require("../models/user");

module.exports = {
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
      console.log("SUCCESS: gAP");
      res.status(200).send(posts);
    } catch (err) {
      console.log("error in getAllPosts", err);
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
      console.log("SUCCESS: gCUP");
      res.status(200).send(posts);
    } catch (err) {
      console.log("error in getCurrentUserPosts", err);
      res.sendStatus(400);
    }
  },

  addPost: async (req, res) => {
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({ title, content, privateStatus: status, userId });
      console.log("SUCCESS: addPost");
      res.sendStatus(200);
    } catch (err) {
      console.log("error in addPost", err);
      res.sendStatus(400);
    }
  },

  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update(
        { privateStatus: status },
        {
          where: { id: +id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log("error in editPost", err);
      res.sendStatus(400);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (err) {
      console.log("error in deletePost", err);
      res.sendStatus(400);
    }
  },
};
