// app.js

// Constructor function for creating product objects
function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
  }
  
  // Array to store product objects
  const productsArray = [];

function fetchAndCreateProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      // Create product objects and push them to the array
      productsArray.push(...data.map(product => new Product(product.title, product.price, product.description, product.image)));
  
      // Render product cards
      renderProductCards();
    })
    .catch(error => {
      // Handle any errors that might occur during the fetch, parsing, or subsequent processing
      console.error('Error fetching or processing product data:', error);
    });
}

  
  // Function to render product cards in the main section
  function renderProductCards() {
    // Get the main section container
    const mainSection = document.getElementById('main-section');
  
    // Loop through the array and create a card for each product
    productsArray.map(product => {
      const card = document.createElement('div');
      card.className = 'card m-2';
      card.style.width = '18rem';
  
      card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
         
          
        </div>
        <div class="card-footer">
        <h5 class="card-title">${product.title}</h5>
          <p class="card-text">Price: $${product.price}</p>
        </div>
      `;
  
      // Append the card to the main section
      mainSection.appendChild(card);
      console.log(product);
    });
  }
  
  // Call the fetchAndCreateProducts function to initiate the process
  fetchAndCreateProducts();
  