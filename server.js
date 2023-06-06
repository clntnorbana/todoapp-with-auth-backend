require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoute = require("./routes/todos");
const userRoute = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// router
app.use("/api/todos", todoRoute);
app.use("/api/user", userRoute);

// connect to database and port
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `listening on port ${process.env.PORT} and connected to database`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
