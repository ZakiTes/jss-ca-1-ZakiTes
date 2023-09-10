document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('table-body');
  
    try {
      const response = await fetch('/memes', {
        headers: {
            'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch memes: ${response.statusText}`);
      }
  
       memes = await response.json();
      
  
      // Iterate through the memes and insert them into the table.
      memes.forEach((meme) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${meme.id}</td>
        <td>${meme.name}</td>
        <td>${meme.width} - ${meme.height}</td>
        <td><img src="${meme.url}" alt="${meme.name}" width="100"></td>
        <td><button class="details-button" data-meme='${JSON.stringify(meme)}'>Details</button></td>
      `;
       // Add a click event listener to the "Details" button.
  const detailsButton = row.querySelector('.details-button');
  detailsButton.addEventListener('click', () => {
    // Retrieve the meme details from the data attribute.
    const memeDetails = JSON.parse(detailsButton.getAttribute('data-meme'));

    // Open a new page or display the meme details as desired.
    // For demonstration purposes, we'll simply log the details to the console.
    console.log('Meme Details:', memeDetails);

    const url = `/meme-details?id=${memeDetails.id}&name=${encodeURIComponent(memeDetails.name)}&width=${memeDetails.width}&height=${memeDetails.height}&url=${encodeURIComponent(memeDetails.url)}`;

    // Redirect to the 'meme-details' route with meme details as query parameters.
    window.location.href = url;
  });


        tableBody.appendChild(row);
      });
    }catch (error) {
      console.error(error);
    }
  });
  
    
          


  



  
  





  

  