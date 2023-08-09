import CartsManager from '../daos/mongoDB/managers/carts-manager.js';
import Services from './main-services.js';

const cartsManager = new CartsManager();

export default class CartsServices extends Services {
  constructor() {
    super(cartsManager);
  }
  async addToCart(cartId, prodId) {
    try {
      const addedProduct = await carts.addToCart(cartId, prodId);
      return addedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cartId, prodId) {
    try {
      const deletedProduct = await carts.deleteProductFromCart(cartId, prodId);
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(id) {
    try {
      const emptyCart = await carts.emptyCart(id);
      return emptyCart;
    } catch (error) {
      console.log(error);
    }
  }
  async processPurchase(id) {
    try {
      const result = await cartsManager.processPurchase(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
