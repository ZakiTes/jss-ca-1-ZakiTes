document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.getElementById('table-body');

  let memes = getCachedMemes();

  if (!memes) {
      try {
          memes = await fetchMemes();
          cacheMemes(memes);
      } catch (error) {
          console.error(error);
      }
  }

 
  memes.forEach((meme) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${meme.id}</td>
          <td>${meme.name}</td>
          <td>${meme.width} - ${meme.height}</td>
          <td><img src="${meme.url}" alt="${meme.name}" width="100"></td>
          <td><button class="details-button" data-meme='${JSON.stringify(meme)}'>Details</button></td>
      `;

      
      const detailsButton = row.querySelector('.details-button');
      detailsButton.addEventListener('click', () => {
          
          const memeDetails = JSON.parse(detailsButton.getAttribute('data-meme'));

        
          console.log('Meme Details:', memeDetails.id);

          

          const url = `/meme/${memeDetails.id}`;

          
          window.location.href = url;
      });

      tableBody.appendChild(row);
  });
  
  async function fetchMemes() {
      const response = await fetch('/memes', {
          headers: {
              'Accept': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch memes: ${response.statusText}`);
      }

      return await response.json();
  }

  function getCachedMemes() {
      const cachedMemes = localStorage.getItem('memes');
      return cachedMemes ? JSON.parse(cachedMemes) : null;
  }

  function cacheMemes(memes) {
      localStorage.setItem('memes', JSON.stringify(memes));
  }
});

  
    
          


  



  
  





  

  