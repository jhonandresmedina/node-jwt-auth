const express = require('express');
const router = express.Router();

const { validateToken } = require('../utils');

const controller = require('../controllers/users');

router.post('/users', (req, res) => controller.add(req, res));
router.get('/users', validateToken, (req, res) => controller.getAll(req, res));

router.post('/login', (req, res) => controller.login(req, res));

module.exports = router;