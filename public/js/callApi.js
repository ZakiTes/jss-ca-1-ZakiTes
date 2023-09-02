const apiUrl = '/proxy/memes'; // Use the proxy route you defined
const numberOfMemes = 20;

async function fetchMemes() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const memes = data.memes;
    return memes;
  } catch (error) {
    console.error('Error fetching memes:', error);
  }
}

async function populateTable() {
    const memes = await fetchMemes();
    const tableBody = document.querySelector('#table tbody');
  
    for (let i = 0; i < numberOfMemes; i++) {
      const meme = memes[i];
  
      // Create a mapped meme object
      const mappedMeme = {
        id: meme.id,
        size: `${meme.width}x${meme.height}`,
        image: meme.url
      };
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${mappedMeme.id}</th>
        <td>${mappedMeme.size}</td>
        <td><img src="${mappedMeme.image}" alt="Meme ${i + 1}" width="100"></td>
        <td>
          <button onclick="handleOptions(${mappedMeme.id})">Options</button>
        </td>
      `;
  
      tableBody.appendChild(row);
    }
  }
  
  
  

function handleOptions(memeId) {
  // Handle options for the meme with the given ID
  console.log(`Options clicked for meme with ID ${memeId}`);
}

populateTable();



