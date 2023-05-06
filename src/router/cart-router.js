import { Router } from 'express';
import {
  createCart,
  getCarts,
  getCartById,
  addToCart,
  removeFromCart,
  deleteCartById,
} from '../manager/cartManager.js';
import { getProductsById } from '../manager/productManager.js';

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
  try {
    const carts = await getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

cartRouter.get('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await getCartById(Number(cartId));
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).send('cart not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

cartRouter.post('/', async (req, res) => {
  try {
    const cart = req.body;
    const newCart = await createCart(cart);
    res.json(newCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

cartRouter.post('/:cartId/products/:prodId', async (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    const selectedCart = await getCartById(Number(cartId));
    const selectedProduct = await getProductsById(Number(prodId));
    if (selectedCart) {
      await addToCart(selectedProduct.id, selectedCart.id);
      res.status(200).send(`product with id ${prodId} was added successfully`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

cartRouter.delete('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const carts = await getCarts();
    if (carts.length > 0) {
      await deleteCartById(Number(cartId));
      res.status(200).send(`cart with id ${cartId} deleted successfully`);
    } else {
      res.send(`cart id ${cartId} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

cartRouter.delete('/:cartId/products/:prodId', async (req, res) => {
  try {
    const { cartId, prodId } = req.params;
    const selectedCart = await getCartById(Number(cartId));
    const selectedProduct = await getProductsById(Number(prodId));
    if (selectedCart) {
      if (selectedProduct) {
        await removeFromCart(prodId, cartId);
        console.log(
          `product with id ${prodId} has been successfully removed from cart id ${cartId}`
        );
      } else {
        console.log(
          `product with id ${prodId} not found in cart with id ${cartId}`
        );
      }
    } else {
      console.log(`cart with id ${cartId} not found`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});
export default cartRouter;
