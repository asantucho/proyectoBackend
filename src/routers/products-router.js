import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  createProductsController,
  updateProductController,
  deleteProductByIdController,
} from '../controllers/products-controllers.js';

const productRouter = Router();

productRouter.get('/', getAllProductsController);
productRouter.get('/:id', getProductByIdController);
productRouter.post('/', createProductsController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductByIdController);

export default productRouter;
