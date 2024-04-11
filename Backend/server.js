const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env, () => {
      console.log("Listening to " + process.env);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/tasks", taskRoutes);
