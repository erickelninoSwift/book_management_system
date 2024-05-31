const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRoutesControllers = require("./routes/userRoute");
const ContactRoutesController = require("./routes/contactRoute");
dotenv.config({
  path: "./.env",
});
const { connectDB } = require("./connect/mongoConnect");

const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ======================

app.use(UserRoutesControllers);
app.use(ContactRoutesController);

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
