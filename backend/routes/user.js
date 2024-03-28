const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user'); 
const authUser = require('../middleware/authUser');

// const authAdmin = require('../middleware/authAdmin');

router.post('/signup', controllers.signup);
router.post('/add', controllers.add);
router.post('/login', controllers.login);
router.get('/byEmail/:email',authUser, controllers.get);
router.put('/update-liked-podcasts',authUser, controllers.updateLikedPodcasts);
router.put('/update-listened-podcasts',authUser, controllers.updateListenedPodcasts);
router.put('/add-card',authUser, controllers.addCard);
router.put('/update-level',authUser, controllers.updateLevel)
router.put('/update-number-downloaded-podcasts',authUser, controllers.updateNbDownloadedPodcastsToday)
router.put('/update-nbChatsMade',authUser, controllers.updateNbChatsMade)
router.post('/reset-password', controllers.sendPasswordResetEmail);
router.post('/verify-user', controllers.verifyUser);
router.put('/update-password', controllers.updatePW)

router.put('/update-subscriptionId',controllers.updateSubscriptionId)
router.put('/update-sessionId',controllers.updateSessionId)
router.put('/update-stripeId',controllers.updateStripeId)
router.delete('/unsubscribe/:userId/:email', controllers.unsubscribe)

router.get('/allUsers', authUser, controllers.all)//l'utilisateur doit être connecté pour accéder


module.exports = router;