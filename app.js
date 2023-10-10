function Product(id, title, price, description, image) {
  this.id = id;
  this.title = title;
  this.price = price;
  this.description = description;
  this.image = image;
}

let productsArray = [];

function fetchAndCreateProducts() {
  const fakestoreapiUrl = 'https://fakestoreapi.com/products';
  const localServerUrl = 'http://localhost:3000/products';

  // Fetch data from fakestoreapi
  fetch(fakestoreapiUrl)
    .then(response => response.json())
    .then(fakestoreData => {
      // Map and push fakestoreapi products
      productsArray.push(...fakestoreData.map(product => new Product(product.id, product.title, product.price, product.description, product.image)));

      // Fetch data from the local server
      fetch(localServerUrl)
        .then(response => response.json())
        .then(localServerData => {
          // Map and push local server products
          productsArray.push(...localServerData.map(product => new Product(product.id, product.title, product.price)));
          
          // Render all products
          renderProductCards();
        })
        .catch(error => {
          console.error('Error fetching or processing local server product data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching or processing fakestoreapi product data:', error);
    });
}

function renderProductCards() {
  const mainSection = document.getElementById('main-section');

 
  // mainSection.innerHTML = '';

  productsArray.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card m-2';
    card.style.width = '18rem';

    card.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="${product.title}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">Price: $${product.price}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i> Delete</button>
        <button class="btn btn-primary" onclick="updateProduct(${product.id})"><i class="fas fa-edit"></i> Update</button>
      </div>
    `;

    mainSection.appendChild(card);
  });
}


function createProduct() {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;

  console.log('Submitting form with title:', title, 'and price:', price);

  fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, price }),
  })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(newProduct => {
      console.log('New product created:', newProduct);

      productsArray.push(new Product(newProduct.id, newProduct.title, newProduct.price));

      // renderProductCards();
    })
    .catch(error => {
      console.error('Error creating product:', error);
    });
}

// Function to handle the update of a product
function updateProduct(productId) {
  // Placeholder for the update functionality
  // You may need to implement a form for updating the product details
  // and send a PUT request to the server to update the product
}

function deleteProduct(productId) {
  fetch(`http://localhost:3000/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => {
      console.log('Product deleted. Response status:', response.status);

      productsArray = productsArray.filter(product => product.id !== productId);

     
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
}

fetchAndCreateProducts();
