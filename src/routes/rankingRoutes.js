const express = require('express');
const router = express.Router();

const {
    getRanking
} = require('../controller/rankingController');

// Obter o ranking
router.get('/', getRanking);

module.exports = router;