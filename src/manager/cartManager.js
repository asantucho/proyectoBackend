import fs from 'fs';
import { __dirname } from '../path.js';

const pathFile = __dirname + '/cart.json';

export const createCart = async (cart) => {
  try {
    const newId = await newId();
    const newCart = {
      ...cart,
      id: newId + 1,
    };
    const cartFile = await getCart();
    cartFile.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(cartGile));
  } catch (error) {
    console.log(error);
  }
};

export const newId = async () => {
  const carts = await getCart();
  let initialId = 0;
  carts.map((cart) => {
    if (cart.id > initialId) initialId = cart.id;
  });
  return initialId;
};
