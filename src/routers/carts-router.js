import { Router } from 'express';
import {
  getAllCartsController,
  getCartByIdController,
  createCartController,
  addToCartController,
  deleteCartByIdController,
  deleteProductFromCartController,
  emptyCartController,
} from '../controllers/carts-controllers.js';

const cartRouter = Router();

cartRouter.get('/', getAllCartsController);
cartRouter.get('/:id', getCartByIdController);
cartRouter.post('/', createCartController);
cartRouter.put('/add/:cartId/:prodId', addToCartController);
cartRouter.delete('/:id', deleteCartByIdController);
cartRouter.put('/delete/:cartId/:prodId', deleteProductFromCartController);
cartRouter.put('/:id', emptyCartController);

export default cartRouter;
