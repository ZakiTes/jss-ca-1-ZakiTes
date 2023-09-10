const express = require('express');
const axios = require('axios');
const router = express.Router();

// Load configuration from config.json
const config = require('../config.json');

router.get('/', async (req, res) => {
  try {
    // Retrieve the API URL from the configuration.
    const apiUrl = config.API_URL;

    if (!apiUrl) {
      throw new Error('API_URL not found in the configuration');
    }

    // Make a GET request to the external API using the apiUrl.
    const response = await axios.get(apiUrl);

    // Extract the first 20 memes from the response data.
    // Assuming the meme data is structured as an array within an object.
    const memeData = response.data; // Assuming meme data is an object with a 'memes' property

    if (!Array.isArray(memeData.memes)) {
      throw new Error('Meme data structure is invalid');
    }

    // Extract the first 20 memes from the memeData.
    const memes = memeData.memes.slice(0, 20);

    // Check the request's "Accept" header to determine the response format.
    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes('application/json')) {
      // If the request accepts JSON, send the memes as JSON.
      res.json(memes);
    } else {
      // Otherwise, render the EJS template for the HTML response.
      res.render('memes', { memes });
    }
  } catch (error) {
    // Handle errors here, e.g., send an error response.
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

module.exports = router;


