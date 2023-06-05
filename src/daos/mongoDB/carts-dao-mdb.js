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
      console.log('aca vemos el console log de cart ' + cart);
      const productToAdd = await productsModel.findById(prodId);
      console.log('a ver que trae el productToAdd ' + productToAdd);
      const isInCart = cart.products.find(
        (product) => product.prodId === productToAdd._id.toString()
      );
      console.log(isInCart);
      if (!isInCart) {
        cart.products.push({ prodId, quantity: 1 });
      } else {
        isInCart.quantity++;
      }
      console.log(isInCart);
      console.log(cart);
      await cart.markModified('products');
      await cart.save();
      console.log('product added successfully!');
    } catch (error) {
      console.log(error);
    }
  }
}
