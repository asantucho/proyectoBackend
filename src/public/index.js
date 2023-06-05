const socketClient = io();
console.log('HALAAAAAAA');

//form for products

const form = document.querySelector('#form');
const inputProductName = document.querySelector('#productName');
const inputProductDescription = document.querySelector('#productDescription');
const inputProductStock = document.querySelector('#productStock');
const inputProductCode = document.querySelector('#productCode');
const inputProductPrice = document.querySelector('#productPrice');
const button = document.querySelector('#button');

const productsContainer = document.querySelector('#productsContainer');
const productsList = document.querySelector('#productsList');

const getProducts = async () => {
  try {
    if (productsContainer) {
      const response = await fetch('/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const products = await response.json();
      const productsRender = products.map((prod) => {
        return `<li>${prod.id} || ${prod.name} || ${prod.description} || ${prod.price}</li>`;
      });
      productsList.innerHTML = productsRender;
    }
  } catch (error) {
    console.log(error);
  }
};

button?.addEventListener('click', async (event) => {
  event.preventDefault();
  const product = {
    name: inputProductName.value,
    description: inputProductDescription.value,
    code: inputProductCode.value,
    stock: inputProductStock.value,
    price: inputProductPrice.value,
  };
  await fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  socketClient.emit('newProduct', product);
  inputProductName.value = '';
  inputProductDescription.value = '';
  inputProductCode.value = '';
  inputProductStock.value = '';
  inputProductPrice.value = '';
});

socketClient.on('products', (data) => {
  const productsRender = data.map((prod) => {
    return `<li>${prod.id} || ${prod.name} || ${prod.description} || ${prod.price}</li>`;
  });
  productsList.innerHTML = productsRender;
});

getProducts();
