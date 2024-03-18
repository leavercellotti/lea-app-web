const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');

const controllers = require('../controllers/stripe'); 
const authAdmin = require('../middleware/authAdmin');

router.post('/checkout', controllers.checkout)//l'utilisateur doit être connecté pour accéder
router.post('/createSubscription', controllers.subscription)
router.post('/createCustomer', controllers.createCustomer)
router.get('/subscription/:_sessionId', controllers.subscription)
router.get('/sessionInfo/:_sessionId', controllers.sessionInfo)
router.get('/getProductFromSubscription/:_subscriptionId', controllers.getProductFromSubscription)

module.exports = router;