const express = require('express');
const axios = require('axios');
const router = express.Router();


const config = require('../config.json');


let cachedMemes = [];


async function fetchMemes() {
  try {
    const apiUrl = config.API_URL;

    if (!apiUrl) {
      throw new Error('API_URL not found in the configuration');
    }

    const response = await axios.get(apiUrl);
    
    const memeData = response.data; 

    if (!Array.isArray(memeData.memes)) {
      throw new Error('Meme data structure is invalid');
    }

    // Extract the first 20 memes from the memeData.
    cachedMemes = memeData.memes.slice(0, 20);

    console.log('Memes fetched and cached successfully');
  } catch (error) {
    console.error(error.message);
  }
}


fetchMemes();

router.get('/', (req, res) => {
  
  const acceptHeader = req.headers.accept;

  if (acceptHeader && acceptHeader.includes('application/json')) {
    res.json(cachedMemes);
  } else {
    res.render('memes', { memes: cachedMemes });
  }
});

module.exports =  router;



