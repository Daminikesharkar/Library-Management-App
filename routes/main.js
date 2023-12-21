const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/',mainController.getIndex);
router.get('/books',mainController.getBooks);

router.post('/',mainController.postBook)

router.get('/returnEntry/:id',mainController.retunEntry);

router.get('/updatedFine',mainController.updateFine);

module.exports = router;