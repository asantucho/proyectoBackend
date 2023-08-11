import { Router } from 'express';
import ProductController from '../controllers/products-controller.js';
import passport from 'passport';
import '../lib/jwt/jwt.js';
import { isAdmin } from '../lib/middlewares/checkRole.js';

const productController = new ProductController();
const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.create
);
productRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.update
);
productRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.delete
);

export default productRouter;
