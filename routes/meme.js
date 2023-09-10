const express = require('express');
const router = express.Router();



router.get('/:id', (req, res) => {
  
  const memeData = fetchMemeById(req.params.id);

  if (!memeData) {
    
    res.status(404).send('Meme not found');
    return;
  }

  
  const memeDetail = {
    id: memeData.id,
    name: memeData.name,
    width: memeData.width,
    height: memeData.height,
    image: memeData.url,
  };

  
  res.render('meme', { meme: memeDetail });
});






module.exports = router;

