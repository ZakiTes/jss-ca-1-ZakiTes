var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function (req, res, next) {
    res.render('memes');
});


module.exports = router;
