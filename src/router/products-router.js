import { Router } from 'express';
import {
  createProduct,
  deleteProductById,
  getProducts,
  getProductsById,
  updatedProductById,
} from '../manager/productManager';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
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

router.post('/', async (req, res) => {
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
