import Controller from './main-controller.js';
import CartsServices from '../services/carts-services.js';
import ProductManager from '../daos/mongoDB/managers/products-manager.js';
import { createResponse } from '../utils/createResponse.js';
import {
  generateUniqueCode,
  calculateTotalAmount,
} from '../utils/ticketFunctions.js';
import { developmentLogger, productionLogger } from '../utils/loggers.js';
import config from '../config/config.js';

const cartsServices = new CartsServices();
const productManager = new ProductManager();

export default class CartsController extends Controller {
  constructor() {
    super(cartsServices);
  }
  addToCart = async (req, res, next) => {
    try {
      const { cartId, prodId } = req.params;
      const addedProduct = await this.service.addToCart(cartId, prodId);

      if (config.ENV === 'PROD') {
        productionLogger.info(
          `Product added to cart: ${JSON.stringify(addedProduct)}`
        );
      } else {
        developmentLogger.info(
          `Product added to cart: ${JSON.stringify(addedProduct)}`
        );
      }
      createResponse(res, 200, addedProduct);
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(
          `Error trying to add the product to cart: ${error.message}`
        );
      } else {
        developmentLogger.error(
          `Error trying to add the product to cart: ${error.message}`
        );
      }

      next(error.message);
    }
  };
  deleteProductFromCart = async (req, res, next) => {
    try {
      const { cartId, prodId } = req.params;
      const deletedProduct = await this.service.deleteProductFromCart(
        cartId,
        prodId
      );
      if (config.ENV === 'PROD') {
        productionLogger.info(
          `Product removed from cart: ${JSON.stringify(deletedProduct)}`
        );
      } else {
        developmentLogger.info(
          `Product removed from cart: ${JSON.stringify(deletedProduct)}`
        );
      }
      createResponse(res, 200, deletedProduct);
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(
          `Error trying to remove product from cart: ${error.message}`
        );
      } else {
        developmentLogger.error(
          `Error trying to remove product from cart: ${error.message}`
        );
      }
      next(error.message);
    }
  };
  emptyCart = async (req, res, next) => {
    try {
      const { id } = req.params;
      const emptyCart = await this.service.emptyCart(id);
      if (config.ENV === 'PROD') {
        productionLogger.info(`Cart emptied: ${JSON.stringify(emptyCart)}`);
      } else {
        developmentLogger.info(`Cart emptied: ${JSON.stringify(emptyCart)}`);
      }
      createResponse(res, 200, emptyCart);
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error trying to empty cart: ${error.message}`);
      } else {
        developmentLogger.error(`Error trying to empty cart: ${error.message}`);
      }
      next(error);
    }
  };
  processPurchase = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { user } = req.user;
      const cart = await this.service.getById(cartId);
      if (!cart)
        return createResponse(
          res,
          404,
          'The cart you are searching for could not be found!'
        );

      const productsToPurchase = cart.products;
      const noStockProducts = [];
      const purchasedProducts = [];

      for (const productItem of productsToPurchase) {
        const product = await productManager.getById(productItem.prodId);
        if (product.stock < productItem.quantity) {
          noStockProducts.push(product._id);
        } else {
          const purchasedQuantity = productItem.quantity;
          product.stock -= purchasedQuantity;
          purchasedProducts.push({
            product: product,
            quantity: purchasedQuantity,
            subtotal: product.price * purchasedQuantity,
          });
          await product.save();
        }

        const totalAmount = calculateTotalAmount(purchasedProducts);
        const ticketCode = generateUniqueCode();
        const actualTime = new Date().toLocaleString();

        const ticketData = {
          code: ticketCode,
          purchaseDateTime: actualTime,
          amount: Number(totalAmount),
          purchaser: user,
          productsPurchased: purchasedProducts,
        };

        const ticket = await this.service.createTicket(ticketData);
        const productsNotPurchased = productsToPurchase.filter((productItem) =>
          noStockProducts.includes(productItem.product)
        );
        cart.product = productsNotPurchased;
        await cart.save();

        if (config.ENV === 'PROD') {
          productionLogger.info('Order placed successfully!');
        } else {
          developmentLogger.info('Order placed successfully!');
        }

        return createResponse(res, 200, ticket);
      }
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error placing the order: ${error.message}`);
      } else {
        developmentLogger.error(`Error placing the order: ${error.message}`);
      }
      next(error);
    }
  };
}
