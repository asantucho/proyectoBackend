import { cartsModel } from './models/carts-model.js';
import { productsModel } from './models/products-model.js';
import { Types } from 'mongoose';

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
      const response = cartsModel.findById(id).populate('products.prodId');
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
      const cart = await cartsModel
        .findById(cartId)
        .populate('products.prodId')
        .exec();
      const productToAdd = await productsModel.findById(prodId);
      const isInCart = cart.products.find(
        (product) => product.prodId === productToAdd._id
      );
      if (!isInCart) {
        cart.products.push({ prodId, quantity: 1 });
      } else {
        isInCart.quantity++;
      }
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
