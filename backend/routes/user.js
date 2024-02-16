const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user'); 
const authUser = require('../middleware/authUser');

router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.get('/:email',authUser, controllers.get);
router.put('/update-liked-podcasts',authUser, controllers.updateLikedPodcasts);
router.put('/update-listened-podcasts',authUser, controllers.updateListenedPodcasts);
router.put('/add-card',authUser, controllers.addCard);
router.put('/update-level',authUser, controllers.updateLevel)
router.put('/update-number-downloaded-podcasts',authUser, controllers.updateNbDownloadedPodcastsToday)
router.put('/update-nbChatsMade',authUser, controllers.updateNbChatsMade)

module.exports = router;