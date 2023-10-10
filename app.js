function Product(title, price, description, image) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
  }
  
  
  const productsArray = [];

function fetchAndCreateProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      
      productsArray.push(...data.map(product => new Product(product.title, product.price, product.description, product.image)));
  
     
      renderProductCards();
    })
    .catch(error => {
      console.error('Error fetching or processing product data:', error);
    });
}

  
  function renderProductCards() {
    const mainSection = document.getElementById('main-section');
  
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
  
      mainSection.appendChild(card);
      console.log(product);
    });
  }
  
  fetchAndCreateProducts();