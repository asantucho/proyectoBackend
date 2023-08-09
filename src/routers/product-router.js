import { Router } from 'express';
import ProductController from '../controllers/products-controller.js';
import { isAdmin } from '../lib/middlewares/checkRole.js';

const productController = new ProductController();
const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', isAdmin, productController.create);
productRouter.put('/:id', isAdmin, productController.update);
productRouter.delete('/:id', isAdmin, productController.delete);

export default productRouter;
