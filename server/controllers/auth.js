require("dotenv").config();
const { SECRET } = process.env;

const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  login: async (req, res) => {
    console.log('login called')
    try {
      console.log(req.body)
      const { username, password } = req.body
      let existingUser = await User.findOne({where: {username}})

      if (existingUser) {
        const isAuthenticated = bcrypt.compareSync(password, existingUser.hashedPass)

        if (isAuthenticated) {
          const token = createToken(existingUser.dataValues.username, existingUser.dataValues.id)
          const exp = Date.now() + 1000*60*60*48
          res.status(200).send({
            username: existingUser.dataValues.username,
            userId: existingUser.dataValues.id,
            token,
            exp
          })
        } else {
          res.status(400).send('authentication error: cannot login')
        }
      } else {
        res.status(400).send('token error: cannot login')
      }
    } catch (err) {
      console.log('login err', err)
      res.sendStatus(400)
    }
  },

  register: async (req, res) => {
    console.log('register called')
    try {
      const { username, password } = req.body
      await User.sync({force: true});
      let existingUser = await User.findOne({where: {username}})

      if (existingUser) {
        res.status(400).send('cannot create user: username already exists')
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const newUser = await User.create({username:username, hashedPass:hash})
        const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
    
        const exp = Date.now() + 1000*60*60*48
        
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp
        })
      }
    } catch (err) {
      console.log('register err', err)
      res.sendStatus(400)
    }
  },
};
