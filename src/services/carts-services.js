import CartsManager from '../daos/mongoDB/managers/carts-manager.js';
import Services from './main-services.js';

const cartsManager = new CartsManager();

export default class CartsServices extends Services {
  constructor() {
    super(cartsManager);
  }
  async addToCart(cartId, prodId) {
    try {
      const addedProduct = await cartsManager.addToCart(cartId, prodId);
      return addedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cartId, prodId) {
    try {
      const deletedProduct = await cartsManager.deleteProductFromCart(
        cartId,
        prodId
      );
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(id) {
    try {
      const emptyCart = await cartsManager.emptyCart(id);
      return emptyCart;
    } catch (error) {
      console.log(error);
    }
  }
  async processPurchase(cartId) {
    try {
      const result = await cartsManager.processPurchase(cartId);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
