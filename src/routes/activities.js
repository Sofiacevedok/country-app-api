const express = require('express');
const { Country, Activity } = require('../db.js');
const router = express.Router();

router.post('/', async (req, res) => {
  const newAct = await Activity.create({
    name: req.body.name,
    difficulty: req.body.difficulty,
    duration: req.body.duration,
    season: req.body.season,
  });
  //"paises": "[uru, arg, bra]"

  const paises = req.body.paises;

  if (paises && paises.length) {
    paises.forEach(async (countryId) => {
      const pais = await Country.findByPk(countryId);
      if (pais) {
        pais.addActivity(newAct);
      }
    });
  }
  res.send(newAct);
});

router.get('/', async (req, res) => {
  const allActivities = await Activity.findAll();
  console.log(allActivities);
  res.send(allActivities);
});

module.exports = router;
