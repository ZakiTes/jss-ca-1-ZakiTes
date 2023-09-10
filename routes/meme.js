const express = require('express');
const router = express.Router();


router.get('/meme-details/:id/:name/:width/:height/:url', (req, res) => {
  

  const memeDetails = {
    id: req.params.id,
    name: decodeURIComponent(req.params.name), // Decode the name parameter.
    width: req.params.width,
    height: req.params.height,
    url: decodeURIComponent(req.params.url),
  };

  res.render('meme', { memeDetails })
})




module.exports = router;

