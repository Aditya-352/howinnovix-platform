const express = require('express');
const router = express.Router();
const { login, register, seedDoctor } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/seed', seedDoctor);

module.exports = router;
