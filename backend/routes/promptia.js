const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');

const controllers = require('../controllers/promptia'); 
const authAdmin = require('../middleware/authAdmin');

router.get('/daily/:level', authUser, controllers.getDailyPrompt)
router.get('/all', authUser, controllers.getAll)//l'utilisateur doit être connecté pour accéder
//router.get('/all', controllers.getAll)//l'utilisateur doit être connecté pour accéder
router.get('/:_id', authUser, controllers.getById)
router.get('/level/:level', authUser, controllers.getByLevel)
router.delete('/delete/:_id', authAdmin, controllers.delete)
router.post('/create/', authAdmin, controllers.create)
router.put('/update/:_id', authAdmin, controllers.update)

module.exports = router;