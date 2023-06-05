import CartsDaoMongo from '../daos/mongoDB/carts-dao-mdb.js';

const carts = new CartsDaoMongo();

export const createCartService = async (object) => {
  try {
    const doc = await carts.createCart(object);
    console.log('service created ' + doc);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartsService = async () => {
  try {
    const docs = await carts.getAllCarts();
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getCartByIdService = async (id) => {
  try {
    const doc = await carts.getCartById(id);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartByIdService = async (id) => {
  try {
    const deletedCart = await carts.deleteCartById(id);
    return deletedCart;
  } catch (error) {
    console.log(error);
  }
};

export const addToCartService = async (cartId, prodId) => {
  try {
    const addedProduct = await carts.addToCart(cartId, prodId);
    return addedProduct;
  } catch (error) {
    console.log(error);
  }
};
