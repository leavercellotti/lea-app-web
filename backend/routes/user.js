const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user'); 

router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.get('/:email', controllers.get);
router.put('/update-liked-podcasts', controllers.updateLikedPodcasts);
router.put('/update-listened-podcasts', controllers.updateListenedPodcasts);
router.put('/add-card', controllers.addCard);
router.put('/update-level', controllers.updateLevel)

module.exports = router;