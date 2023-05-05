import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProducts,
  getProductsById,
  updatedProductById,
} from '../manager/productManager.js';
import { productValidator } from '../middleware/productValidator.js';

const router = Router();

router.get('/', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  try {
    const products = await getProducts(limit);
    const limitedProducts = limit ? products.slice(0, limit) : products;
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.get('/:prodId', async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await getProductsById(Number(prodId));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.post('/', productValidator, async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await createProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.put('/:prodId', async (req, res) => {
  try {
    const product = req.body;
    const { prodId } = req.params;
    const selectedProduct = await getProductsById(Number(prodId));
    if (selectedProduct) {
      await updatedProductById(product, Number(prodId));
      res.status(200).send('product updated successfully');
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.delete('/:prodId', async (req, res) => {
  try {
    const { prodId } = req.params;
    const products = await getProducts();
    if (products.length > 0) {
      await deleteProductById(Number(prodId));
      res.status(200).send(`product with id ${prodId} deleted successfully`);
    } else {
      res.send(`product id ${prodId} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

export default router;
