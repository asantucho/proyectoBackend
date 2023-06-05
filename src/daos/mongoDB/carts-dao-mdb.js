import { cartsModel } from './models/carts-model.js';
import { productsModel } from './models/products-model.js';

export default class CartsDaoMongo {
  async createCart(object) {
    try {
      const cart = await cartsModel.create(object);
      console.log(`cart ${cart} created successfully`);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(id) {
    try {
      const response = await cartsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCarts() {
    try {
      const response = await cartsModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCartById(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      console.log(`cart with id ${id} deleted successfully`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async addToCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      const productToAdd = await productsModel.findById(prodId);
      const isInCart = cart.products.find(
        (product) => product.id === productToAdd.prodId
      );
      console.log(isInCart);
      if (!isInCart) {
        cart.products.push({ prodId, quantity: 1 });
      } else {
        isInCart.quantity++;
      }
      await cart.save();
      console.log('product added successfully!');
    } catch (error) {
      console.log(error);
    }
  }
}
