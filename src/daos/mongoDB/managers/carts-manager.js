import MainClass from '../main-class.js';
import { ticketsModel } from '../models/ticket-model.js';
import { cartsModel } from '../models/carts-model.js';
import { productsModel } from '../models/products-model.js';
import { usersModel } from '../models/users-model.js';
import { generateUniqueCode, calculateTotalAmount } from '../../../utils.js';

export default class CartsManager extends MainClass {
  constructor() {
    super(cartsModel);
  }
  async addToCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      const productToAdd = await productsModel.findById(prodId);
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
  async createTicket(data) {
    try {
      const response = await ticketsModel.create(data);
      return response;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
