const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Country, Activity, CountryActivities } = require('../db.js');
const iconv = require('iconv-lite');
const { apiKey } = process.env;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

function encode_utf8(s) {
  return iconv.decode(Buffer.from(s, 'binary'), 'ISO-8859-1');
}
const isActivity = ['ARG', 'URY', 'MEX'];

/* function letraMayus(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
} */

router.get('/', async (req, res) => {
  const bd = await Country.findAll();
  if (!bd.length) {
    await axios
      .get(`https://countryapi.io/api/all?apikey=${apiKey}`)
      .then(async (response) => {
        const { data } = response;
        for (const key in data) {
          const obj = {
            name: data[key].translations.spa
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
            continente: encode_utf8(data[key].region),
            subregión: encode_utf8(data[key].subregion),
            bandera: data[key].flag.large,
            capital: encode_utf8(data[key].capital),
            id: data[key].alpha3Code,
            población: Number(data[key].population),
            area: String(data[key].area),
          };
          bd.push(obj);
          const country = await Country.create(obj);

          if (isActivity.includes(data[key].alpha3Code)) {
            const tomarMate = await Activity.findAll({
              where: { name: 'tomar mate' },
            });

            if (!tomarMate.length) {
              const newAct = await Activity.create({
                name: 'tomar mate',
                difficulty: 'facil',
                duration: '2hs',
                season: 'invierno',
              });

              country.addActivity(newAct);
            } else {
              country.addActivity(tomarMate);
            }
          }
        }
      });
  }

  var name = req.query.name;
  var continente = req.query.continente;
  var actividad = req.query.actividad;
  var poblacion = req.query.poblacion;
  var alfabetico = req.query.alfabetico;
  var paises = req.query.paises;

  const where = {};
  const order = [];

  if (paises) {
    const pais = await Country.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    return res.send(pais);
  }
  if (name) {
    where.name = { [Op.iLike]: `%${name}%` };
  }
  if (continente) {
    where.continente = { [Op.iLike]: `%${continente}%` };
  }
  if (poblacion && !alfabetico) {
    order.push(['población', poblacion]);
  }
  if (alfabetico) {
    order.push(['name', alfabetico]);
  }

  if (actividad) {
    const paises = await Country.findAll({
      where,
      order,
      include: {
        model: Activity,
        where: { name: { [Op.iLike]: `%${actividad}%` } },
      },
    });
    console.log('ENTRO ACA ACTIVITY', { order });
    return res.send(paises);
  }

  const allCountries = await Country.findAll({
    where,
    order,
  });
  console.log('apiiiiiiiiiiiiiiiiiiiiiiiiii', {
    poblacion,
    alfabetico,
    order,
  });
  return res.send(allCountries);
});

router.get('/:id', function (req, res) {
  const idCountry = req.params.id.toLocaleUpperCase();
  Country.findOne({
    where: {
      id: idCountry,
    },
    include: {
      model: Activity,
    },
  }).then(function (pais) {
    if (pais) {
      console.log({ pais, id: idCountry });
      res.send(pais);
    } else {
      res.send([]);
    }
  });
});

module.exports = router;
