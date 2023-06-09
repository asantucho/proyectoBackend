import {
  createCartService,
  getAllCartsService,
  getCartByIdService,
  deleteCartByIdService,
  addToCartService,
  deleteProductFromCartService,
  emptyCartService,
} from '../services/carts-services.js';

export const createCartController = async (req, res, next) => {
  try {
    const cart = { ...req.body };
    const newCart = await createCartService(cart);
    console.log(`controller created ${newCart}`);
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const getAllCartsController = async (req, res, next) => {
  try {
    const carts = await getAllCartsService();
    res.json(carts);
  } catch (error) {
    next(error);
  }
};

export const getCartByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await getCartByIdService(id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const deleteCartByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCart = await deleteCartByIdService(id);
    res.json(`${deletedCart} deleted successfully`);
  } catch (error) {
    next(error);
  }
};

export const addToCartController = async (req, res, next) => {
  try {
    const { cartId, prodId } = req.params;
    const addedProduct = await addToCartService(cartId, prodId);
    res.json(addedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductFromCartController = async (req, res, next) => {
  try {
    const { cartId, prodId } = req.params;
    const deletedProduct = await deleteProductFromCartService(cartId, prodId);
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

export const emptyCartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const emptyCart = await emptyCartService(id);
    res.json(emptyCart);
  } catch (error) {
    next(error);
  }
};
