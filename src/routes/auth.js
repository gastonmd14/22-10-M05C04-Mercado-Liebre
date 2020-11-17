const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.post('/login', authController.processlogin);

router.get('/register', authController.register);
router.post('/register', authController.processregister);

module.exports = router;