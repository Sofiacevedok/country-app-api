const { Router } = require('express');
const server = require('../app');

const countries = require('./countries');
const activities = require('./activities');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activity', activities);

module.exports = router;
