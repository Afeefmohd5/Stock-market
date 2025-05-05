const express = require('express');
const { angleOneAuthController } = require('../controllers/angleOneAuthController');
const router = express.Router();


router.post('/auth/login', angleOneAuthController);

module.exports = router;
