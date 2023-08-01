import { Router } from 'express';
import ProductController from '../controllers/products-controller.js';

const productController = new ProductController();
const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', productController.create);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);

export default productRouter;
