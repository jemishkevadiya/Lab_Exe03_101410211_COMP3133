const Restaurant = require("../models/Restaurant");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).select("_id restaurant_id name cuisines city");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

exports.getRestaurantsByCuisine = async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisines: cuisine }).select("_id restaurant_id name cuisines city");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

exports.getRestaurantsSorted = async (req, res) => {
  try {
    const sortBy = req.query.sortBy === "DESC" ? -1 : 1;
    const restaurants = await Restaurant.find({})
      .select("restaurant_id name cuisines city")
      .sort({ restaurant_id: sortBy });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

exports.getDelicatessenRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisines: "Delicatessen",
      city: { $ne: "Brooklyn" },
    })
      .select("name cuisines city -_id") 
      .sort({ name: 1 });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};
