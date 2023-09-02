var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/meme', function (req, res, next) {
    res.render('meme');
});

module.exports = router;
