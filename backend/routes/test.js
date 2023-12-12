const express = require('express');
const router = express.Router();

const controllers = require('../controllers/test'); 

router.get('/all', controllers.getAll)
router.get('/:_id', controllers.getById)
router.delete('/delete/:_id',controllers.delete)
router.post('/create/', controllers.create)
router.put('/update/:_id', controllers.update)

module.exports = router;