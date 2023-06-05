import { Router } from 'express';
import {
  getAllCartsController,
  getCartByIdController,
  createCartController,
  addToCartController,
  deleteCartByIdController,
} from '../controllers/carts-controllers.js';

const cartRouter = Router();

cartRouter.get('/', getAllCartsController);
cartRouter.get('/:id', getCartByIdController);
cartRouter.post('/', createCartController);
cartRouter.post('/:cartId/:prodId', addToCartController);
cartRouter.delete('/:id', deleteCartByIdController);

export default cartRouter;
