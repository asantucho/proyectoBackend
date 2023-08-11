import { Router } from 'express';
import passport from 'passport';
import '../lib/jwt/jwt.js';
import CartsController from '../controllers/carts-controllers.js';
import { isUser } from '../lib/middlewares/checkRole.js';

const cartsController = new CartsController();

const cartRouter = Router();

cartRouter.put(
  '/add/:cartId/:prodId',
  passport.authenticate('jwt', { session: false }),
  isUser,
  cartsController.addToCart
);
cartRouter.post(
  '/:cartId/purchase',
  passport.authenticate('jwt', { session: false }),
  isUser,
  cartsController.processPurchase
);

cartRouter.get('/', cartsController.getAll);
cartRouter.get('/:id', cartsController.getById);
cartRouter.post('/', cartsController.create);
cartRouter.delete('/:id', cartsController.delete);
cartRouter.put(
  '/delete/:cartId/:prodId',
  cartsController.deleteProductFromCart
);
cartRouter.put('/:id', cartsController.emptyCart);

export default cartRouter;
