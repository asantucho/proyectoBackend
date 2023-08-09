import MainClass from '../main-class.js';
import { cartsModel } from '../models/carts-model.js';
import { productsModel } from '../models/products-model.js';
import { generateUniqueCode, calculateTotalAmount } from '../../../utils.js';

export default class CartsManager extends MainClass {
  constructor() {
    super(cartsModel);
  }
  async addToCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      console.log('aca vemos el console log de cart ' + cart);
      console.log(prodId);
      const productToAdd = await productsModel.findById(prodId);
      console.log('a ver que trae el productToAdd ' + productToAdd);
      const isInCart = cart.products.find((product) => {
        return product.prodId.toString() === productToAdd._id.toString();
      });
      console.log(isInCart);
      if (!isInCart) {
        const newProduct = {
          prodId: productToAdd._id.toString(),
          quantity: 1,
        };
        cart.products.push(newProduct);
      } else {
        isInCart.quantity += 1;
      }
      console.log(cart);
      await cart.markModified('products');
      await cart.save();
      console.log('product added successfully!');
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductFromCart(cartId, prodId) {
    try {
      const cart = await cartsModel.findById(cartId);
      const productToDelete = await productsModel.findById(prodId);
      const productIndex = cart.products.findIndex(
        (product) =>
          product.prodId.toString() === productToDelete._id.toString()
      );
      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity === 1) {
          cart.products.splice(productIndex, 1);
        } else {
          cart.products[productIndex].quantity--;
        }
        await cart.markModified('products');
        await cart.save();
        console.log('product deleted successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async emptyCart(id) {
    try {
      const cart = await cartsModel.findById(id);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async processPurchase(cartId) {
    try {
      const cart = await cartsModel
        .findById(cartId)
        .populate('products.prodId');

      const productsToPurchase = [];

      for (const cartProduct of cart.products) {
        const product = cartProduct.prodId;

        if (product.stock >= cartProduct.quantity) {
          productsToPurchase.push({
            product: product._id,
            quantity: cartProduct.quantity,
            price: product.price,
          });
        }
      }
      if (productsToPurchase.length === 0) {
        return res.status(400).json({
          message: 'No hay productos disponibles para comprar en el carrito.',
        });
      }

      const ticketProducts = [];

      for (const purchaseProduct of productsToPurchase) {
        await productsModel.findByIdAndUpdate(purchaseProduct.product, {
          $inc: { stock: -purchaseProduct.quantity },
        });

        ticketProducts.push({
          product: purchaseProduct.product,
          quantity: purchaseProduct.quantity,
          price: purchaseProduct.price,
        });
      }

      const newTicket = new Ticket({
        code: generateUniqueCode(),
        amount: calculateTotalAmount(ticketProducts),
        purchaser: cart.user.cart,
      });

      await newTicket.save();

      const remainingProducts = cart.products.filter(
        (cartProduct) =>
          !productsToPurchase.some((p) => p.product.equals(cartProduct.prodId))
      );
      cart.products = remainingProducts;
      await cart.save();

      return res
        .status(200)
        .json({ message: 'Compra exitosa', ticket: newTicket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al procesar la compra' });
    }
  }
}
