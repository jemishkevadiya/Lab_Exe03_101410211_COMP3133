const Restaurant = require("../models/Restaurant");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

exports.getRestaurantsByCuisine = async (req, res) => {
    try {
      const cuisine = req.params.cuisine.trim();
  
      if (!cuisine) {
        return res.status(400).json({ message: "Cuisine parameter is required" });
      }
  
      const restaurants = await Restaurant.find({ cuisine: cuisine }).select(
        "_id restaurant_id name cuisine city"
      );
  
      if (!restaurants || restaurants.length === 0) {
        return res.status(404).json({ message: `No restaurants found with cuisine: ${cuisine}` });
      }
  
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants by cuisine", error });
    }
};  

exports.getRestaurantsSorted = async (req, res) => {
    try {
      let { sortBy } = req.query;

      if (!sortBy || (sortBy.toUpperCase() !== "ASC" && sortBy.toUpperCase() !== "DESC")) {
        return res.status(400).json({ message: "Invalid sortBy parameter. Use ASC or DESC." });
      }
  
      const sortOrder = sortBy.toUpperCase() === "DESC" ? -1 : 1;

      const restaurants = await Restaurant.find({})
        .select("restaurant_id name cuisine city")
        .sort({ restaurant_id: sortOrder });
  
      if (!restaurants || restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found" });
      }
  
      res.json(restaurants);
    } catch (error) {
      console.error("Error fetching sorted restaurants:", error);
      res.status(500).json({ message: "Error fetching sorted restaurants", error });
    }
  };
  

exports.getDelicatessenRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisine: "Delicatessen",
      city: { $ne: "Brooklyn" },
    })
      .select("name cuisine city -_id")
      .sort({ name: 1 });

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: "No Delicatessen restaurants found outside Brooklyn" });
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching Delicatessen restaurants:", error);
    res.status(500).json({ message: "Error fetching Delicatessen restaurants", error });
  }
};
