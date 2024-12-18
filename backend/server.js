const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// use cors
app.use(cors());
//use  body parser
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true, // Correct spelling
    useUnifiedTopology: true, // Correct spelling
  })
  .then(() => console.log("MongoDB connected successfull..."))
  .catch((err) => console.log(err.massage));

//create connecttion
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mongoDB connection establish successfull");
});

// app load the port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
