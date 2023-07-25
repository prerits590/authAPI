const express = require("express");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userRoute = express.Router();

//signup

userRoute.post("/", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new userModel({ name, email, password: hash, age });
      await user.save();
      console.log(user);
      res.status(200).send("sign up successfull !!!");
    });
  } catch (err) {
    console.log(err);
  }
});

//login

userRoute.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            token: jwt.sign({ userId: "user._id" }, "shhhhh"),
            msg: "auth sucessful !!!",
          });
          console.log(user);
        } else {
          res.status(400).send("wrong creds");
        }
      });
    } else {
      res.status(400).send("User not found");
    }
  } catch (err) {
    res.status(400).send("error while logging in");
  }
});

module.exports = { userRoute };
