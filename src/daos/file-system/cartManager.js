import fs from 'fs';
import { __dirname } from '../../utils/utils.js';
import { getProductsById } from './productManager.js';

const pathFile = __dirname + '/carts.json';
const productsPath = __dirname + '/products.json';

export const createCart = async (cart) => {
  try {
    const latestId = await newId();
    const newCart = {
      ...cart,
      id: latestId + 1,
    };
    const cartFile = await getCarts();
    cartFile.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(cartFile));
  } catch (error) {
    console.log(error);
  }
};

export const newId = async () => {
  const carts = await getCarts();
  let initialId = 0;
  carts.map((cart) => {
    if (cart.id > initialId) initialId = cart.id;
  });
  return initialId;
};

export const getCarts = async () => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, 'utf-8');
      const cartsJs = JSON.parse(carts);
      return cartsJs;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCartById = async (cartId) => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, 'utf-8');
      const cartsJs = JSON.parse(carts);
      return cartsJs.find((cart) => cart.id === cartId);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (prodId, cartId) => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, 'utf-8');
      const cartsJs = JSON.parse(carts);
      const selectedCart = cartsJs.find((cart) => cart.id === cartId);
      const selectedProduct = await getProductsById(prodId);
      if (selectedCart) {
        if (!selectedProduct) {
          console.log('product not found');
        } else {
          const productToAdd = selectedCart.products.find(
            (product) => product.id === selectedProduct.id
          );
          if (!productToAdd) {
            selectedCart.products.push({ id: selectedProduct.id, quantity: 1 });
          } else {
            productToAdd.quantity++;
          }
          await fs.promises.writeFile(pathFile, JSON.stringify(cartsJs));
          console.log('Product added to cart successfully');
        }
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// se que eliminar un producto del carrito no se pedía en la entrega pero igual traté de hacerlo

export const removeFromCart = async (prodId, cartId) => {
  try {
    if (fs.existsSync(pathFile)) {
      const carts = await fs.promises.readFile(pathFile, 'utf-8');
      const cartsJs = JSON.parse(carts);
      const selectedCart = cartsJs.find((cart) => cart.id === cartId);
      const selectedProduct = await getProductsById(prodId);
      if (selectedCart) {
        if (selectedProduct.quantity === 1) {
          const remainingProducts = selectedCart.products.filter(
            (product) => product.id !== selectedProduct.id
          );
          await fs.promises.writeFile(
            pathFile,
            JSON.stringify(remainingProducts)
          );
          return selectedProduct;
        } else if (selectedProduct.quantity > 1) {
          selectedProduct.quantity--;
        } else {
          console.log('the product is not in the cart to be deleted');
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartById = async (id) => {
  try {
    const carts = await fs.promises.readFile(pathFile, 'utf-8');
    const cartsJs = JSON.parse(carts);
    const deletedCart = cartsJs.find((cart) => cart.id === id);
    const remainingCarts = cartsJs.filter((cart) => cart.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(remainingCarts));
    return deletedCart;
  } catch (error) {
    console.log(error);
  }
};
