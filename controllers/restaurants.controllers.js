const Restaurants = require("../models/Restaurants");

const getRestaurants = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const restaurants = await Restaurants.find()
      .limit(limit)
      .skip(startIndex)
      .sort("restaurant_id");
    if (!restaurants) throw Error("no restaurants");
    res.status(200).json(restaurants);
    console.log(restaurants.length);
    //console.log(req.query);
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

// for searching

const getSearchedRestaurants = async (req, res) => {
  try {
    if (req.query.borough !== "") {
      search_param_1 = { borough: req.query.borough };
    } else {
      search_param_1 = {};
    }

    if (req.query.cuisine !== "") {
      search_param_2 = { cuisine: req.query.cuisine };
    } else {
      search_param_2 = {};
    }
    const result = await Restaurants.find(search_param_1).find(search_param_2);
    if (!result) throw Error("no restaurants");
    res.status(200).json(result);
    console.log(result.length);
    console.log(search_param_1);
    console.log(search_param_2);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurants.findOne({
      restaurant_id: req.query._id,
    });
    if (!restaurant) throw Error("no such data or error");
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

const postRestaurant = async (req, res) => {
  const newRestaurant = new Restaurants(req.body);

  try {
    const restaurant = await newRestaurant.save();
    if (!restaurant) throw Error("Something went wrong while saving post");

    res.status(200).json(restaurant);
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

//

const getRestaurantAddress = async (req, res) => {
  try {
    const restaurantAddress = await Restaurants.findOne({
      restaurant_id: req.params.restaurant_id,
    });
    if (!restaurantAddress) throw Error("no such data or error");
    res.status(200).json(restaurantAddress.address);
  } catch (err) {
    res.status(404).json({ msg: err });
  }
};

module.exports = {
  getRestaurant,
  getRestaurants,
  postRestaurant,
  getRestaurantAddress,
  getSearchedRestaurants,
};
