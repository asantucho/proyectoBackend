import { Router } from 'express';
import CartsController from '../controllers/carts-controllers.js';
import { isUser } from '../lib/middlewares/checkRole.js';

const cartsController = new CartsController();

const cartRouter = Router();

cartRouter.get('/', cartsController.getAll);
cartRouter.get('/:id', cartsController.getById);
cartRouter.post('/', cartsController.create);
cartRouter.put('/add/:cartId/:prodId', isUser, cartsController.addToCart);
cartRouter.delete('/:id', cartsController.delete);
cartRouter.put(
  '/delete/:cartId/:prodId',
  cartsController.deleteProductFromCart
);
cartRouter.put('/:id', cartsController.emptyCart);
cartRouter.post('/:cartId/purchase', isUser, cartsController.processPurchase);

export default cartRouter;
