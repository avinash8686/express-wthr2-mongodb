const express = require("express");
const verify = require("../middleware/privateRoute");
const router = express.Router();

const { getCurrentWeather } = require("../Controller/weather");

//function to get all blog posts api
router.get("/current", verify, getCurrentWeather);

module.exports = router;
