const { Router } = require("express");

const restaurants_router = Router();
const restaurants_address_router = Router({ mergeParams: true });

const {
  postRestaurant,
  getRestaurants,
  getRestaurant,
  getRestaurantAddress,
  getSearchedRestaurants,
} = require("../controllers/restaurants.controllers");

restaurants_router.get("/restaurants", getRestaurants);

restaurants_router.get("/restaurants/search", getSearchedRestaurants);
restaurants_router.get("/restaurants/restaurant", getRestaurant);
restaurants_router.post("/restaurants", postRestaurant);

//

restaurants_address_router.get("/address", getRestaurantAddress);

module.exports = { restaurants_router, restaurants_address_router };
