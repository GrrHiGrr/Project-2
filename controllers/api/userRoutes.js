const { User } = require("../../models");
const axios = require("axios");
const router = require('express').Router();

  router.post('/register', async (req, res) => {
    const GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.city + "," + req.body.state + "&key=" + "AIzaSyBbd_CQADqbRBO4N3Ur6uqIiI24ioa0T9E";
    const results = await axios.get(GoogleAPIURL)
    console.log (results.data.results[0].geometry.location)
    const location = JSON.stringify(results.data.results[0].geometry.location)

    const newUser = await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      location
    });
    req.session.save(() => {
      req.session.user = newUser.id;
      req.session.loggedIn = true;
      return res.json(newUser);
    });
  })

  router.post('/find', async (req, res) => {
try {
    // Step 1: Get a location from the user, like city
    // Step 2: Turn that into a lat/lon location with google maps
    // Step 3: Get all the users
    // Step 4: Calculate the distance between my location and each user
    // Step 5: Filter those usrs and locations by a certain distance

    var rad = function(x) {
      return x * Math.PI / 180;
    };
    
    var getDistance = function(p1, p2) {
      var R = 6378137; // Earth's mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };

    const GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.city + "," + req.body.state + "&key=" + "AIzaSyBbd_CQADqbRBO4N3Ur6uqIiI24ioa0T9E";
    const results = await axios.get(GoogleAPIURL)
    console.log (results.data.results[0].geometry.location)
    const location = results.data.results[0].geometry.location
    const allUsers = await User.findAll()
    console.log(allUsers)
    let allUsersPlain = allUsers.map((userData, i) => {
      return userData.get({ plain: true })
    })
    allUsersPlain = allUsersPlain.filter((user, i) => {
      let userLocation = JSON.parse(user.location)
      let distance = getDistance(userLocation, location)
      console.log(distance)
      return distance > req.body.distance ? false : true
    })

    console.log(allUsersPlain)
    res.status(200).json(allUsersPlain)
} catch(err) {
  console.log(err)
  res.status(400).json(err)
}
  })

  router.post('/login', async (req, res) => {
    //check for existing login
    if (req.session.loggedIn) console.log(req.session.user);
    //check for user in db
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Invalid login credentials" });
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = user.checkPassword(req.body.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password" });

    res.json(user);
  })

  module.exports = router;