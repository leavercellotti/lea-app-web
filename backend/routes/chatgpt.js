const express = require('express');
const router = express.Router();

const controllers = require('../controllers/chatgpt'); 
router.post('/connect', controllers.connect);

module.exports = router;