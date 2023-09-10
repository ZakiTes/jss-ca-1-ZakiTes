function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll("#table-body tr");
  
    rows.forEach((row) => {
      const nameCell = row.querySelector("td:nth-child(2)"); 
      if (nameCell) {
        const name = nameCell.textContent.toLowerCase();
        if (name.includes(filter) || filter === "") {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    });
  }
  
  
  document.getElementById("searchButton").addEventListener("click", searchTable);
  
  
  document.getElementById("searchInput").addEventListener("input", () => {
    const input = document.getElementById("searchInput");
    if (input.value === "") {
      searchTable();
    }
  });


