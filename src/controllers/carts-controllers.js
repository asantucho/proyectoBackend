import Controller from './main-controller.js';
import CartsServices from '../services/carts-services.js';
import ProductManager from '../daos/mongoDB/managers/products-manager.js';
import {
  createResponse,
  generateUniqueCode,
  calculateTotalAmount,
} from '../utils.js';

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
  processPurchase = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { user } = req.user;
      const cart = await this.service.getById(cartId);
      console.log('cart en processPurchase: ', cart);
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
        console.log('Product Item:', productItem);
        const product = await productManager.getById(productItem.prodId);
        console.log('Product:', product);
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

        return createResponse(res, 200, ticket);
      }
    } catch (error) {
      next(error);
    }
  };
}
