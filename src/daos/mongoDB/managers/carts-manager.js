import MainClass from '../main-class.js';
import { cartsModel } from './models/carts-model.js';
import { productsModel } from './models/products-model.js';

export default class CartsManager extends MainClass {
  constructor() {
    super(cartsModel);
  }
  async addToCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      console.log('aca vemos el console log de cart ' + cart);
      console.log(prodId);
      const productToAdd = await productsModel.findById(prodId);
      console.log('a ver que trae el productToAdd ' + productToAdd);
      const isInCart = cart.products.find((product) => {
        return product.prodId.toString() === productToAdd._id.toString();
      });
      console.log(isInCart);
      if (!isInCart) {
        const newProduct = {
          prodId: productToAdd._id.toString(),
          quantity: 1,
        };
        cart.products.push(newProduct);
      } else {
        isInCart.quantity += 1;
      }
      console.log(cart);
      await cart.markModified('products');
      await cart.save();
      console.log('product added successfully!');
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      const productToDelete = await productsModel.findById(prodId);
      const productIndex = cart.products.findIndex(
        (product) =>
          product.prodId.toString() === productToDelete._id.toString()
      );
      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity === 1) {
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].quantity--;
        }
        await cart.markModified('products');
        await cart.save();
        console.log('product deleted successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(id) {
    try {
      const cart = await cartsModel.findById(id);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
