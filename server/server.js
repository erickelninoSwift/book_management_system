const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { connectDB } = require("./connect/mongoConnect");

const PORT = process.env.PORT || 8080;

const app = express();

const start = async () => {
  await connectDB(process.env.MONGOBD_URL)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Application is running on port ${PORT}`);
      });
    })
    .catch((error) => console.log(error));
};

start();
