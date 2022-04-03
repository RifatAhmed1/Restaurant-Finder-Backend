const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const {
  restaurants_router,
  restaurants_address_router,
} = require("./routes/restaurants.routes");

const cors = require("cors");

const mongo_uri = process.env.MONGO_URI;

const app = express();

// connect to mongodb

mongoose
  .connect(mongo_uri)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(cors({ origin: "*" }));
app.use(express.json());

restaurants_router.use(
  "/restaurants/:restaurant_id",
  restaurants_address_router
);

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api", restaurants_router);

module.exports = app;
