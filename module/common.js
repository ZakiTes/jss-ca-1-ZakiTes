const memes = [
    {
      id: 1,
      name: 'Meme 1',
      width: 200,
      height: 150,
      url: 'meme1.jpg',
    },
    {
      id: 2,
      name: 'Meme 2',
      width: 300,
      height: 200,
      url: 'meme2.jpg',
    }
]


function fetchMemeDataById(memeId) {
    // Find the meme with the matching ID in the array
    const meme = memes.find((meme) => meme.id === memeId);
    return meme;
  }
  
  // Export the functions and data you want to make available to other parts of your application
  module.exports = {
    fetchMemeDataById,
    // You can add more exports here if needed
  };
  
  
  
  
  