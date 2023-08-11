import Controller from './main-controller.js';
import CartsServices from '../services/carts-services.js';
import { createResponse } from '../utils.js';

const cartsServices = new CartsServices();

export default class CartsController extends Controller {
  constructor() {
    super(cartsServices);
  }
  addToCart = async (req, res, next) => {
    try {
      const { cartId, prodId } = req.params;
      const addedProduct = await this.service.addToCart(cartId, prodId);
      createResponse(res, 200, addedProduct);
    } catch (error) {
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
      createResponse(res, 200, deletedProduct);
    } catch (error) {
      next(error.message);
    }
  };
  emptyCart = async (req, res, next) => {
    try {
      const { id } = req.params;
      const emptyCart = await this.service.emptyCart(id);
      createResponse(res, 200, emptyCart);
    } catch (error) {
      next(error);
    }
  };
  processPurchase = async (req, res, next, error) => {
    try {
      const { cartId } = req.params;
      const user = req.user;
      const result = await this.service.processPurchase(cartId, user);

      if (result.success) {
        createResponse(res, 200, {
          message: 'Compra exitosa',
          ticket: result.ticket,
        });
      } else {
        createResponse(res, 500, {
          message: 'Error al procesar la compra' + error.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
