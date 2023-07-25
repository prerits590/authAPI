const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { userModel } = require("./model/user.model");
const { userRoute } = require("./routes/user.route");
const { connection } = require("./database");

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/", userRoute);

app.listen(4000, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server Running at ${4000} Port`);
});
