const router = require('express').Router();
const { Pet, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require("axios")

router.get('/', async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    const pets = petData.map((project) => pet.get({ plain: true }));

    res.render('homepage', { 
      pets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pet/:name', async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.name, {
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    const pet = petData.get({ plain: true });

    res.render('pet', {
      ...pet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/petregister', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    });

    const user = userData.get({ plain: true });
    console.log("user",user)
    res.render('petregister', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post("/petregister", async(req,res)=> {
  //get the payload, get user info from session, create db record.
  console.log("payload", req.body);
  console.log("session", req.session);
  const pet = await Pet.create({
    ...req.body,
    user_id: req.session.user
  });
  res.json(pet);
})

router.get('/pets', async (req,res)=> {
    const GoogleAPIURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.city + "," + req.body.state + "&key=" + "AIzaSyBbd_CQADqbRBO4N3Ur6uqIiI24ioa0T9E";
    const results = await axios.get(GoogleAPIURL)
    console.log (results.data.results[0].geometry.location)
    res.render("pets")
})

router.get('/info', async (req,res)=> {
  res.render("info")
})


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    });

    const user = userData.get({ plain: true });
    console.log("user",user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {
  res.render('register')
})
router.get('/find', async (req, res) => {
  res.render('find')
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;