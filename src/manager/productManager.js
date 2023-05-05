import fs from 'fs';
import { __dirname } from '../path.js';

const pathFile = __dirname + '/products.json';

export const createProduct = async (product) => {
  try {
    const latestId = await newId();
    const newProduct = {
      ...product,
      id: latestId + 1,
    };
    const productsFile = await getProducts();
    productsFile.push(newProduct);
    await fs.promises.writeFile(pathFile, JSON.stringify(productsFile));
  } catch (error) {
    console.log(error);
  }
};

export const newId = async () => {
  const products = await getProducts();
  let initialId = 0;
  products.map((product) => {
    if (product.id > initialId) initialId = product.id;
  });
  return initialId;
};

export const getProducts = async (limit = null) => {
  try {
    if (fs.existsSync(pathFile)) {
      const products = await fs.promises.readFile(pathFile, 'utf-8');
      const productsJs = JSON.parse(products);
      if (limit) {
        return productsJs.slice(0, limit);
      } else {
        return productsJs;
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = async (id) => {
  try {
    if (fs.existsSync(pathFile)) {
      const products = await fs.promises.readFile(pathFile, 'utf-8');
      const productsJs = JSON.parse(products);
      return productsJs.find((product) => product.id === id);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatedProductById = async (id, updatedProduct) => {
  try {
    const product = await getProductsById(id);
    if (product) {
      product.title = updatedProduct.title ?? product.title;
      product.description = updatedProduct.description ?? product.description;
      product.price = updatedProduct.price ?? product.price;
      product.thumbnail = updatedProduct.imageUrl ?? product.imageUrl;
      product.stock = updatedProduct.stock ?? product.stock;
      product.code = updatedProduct.code ?? product.code;

      const products = await fs.promises.readFile(pathFile, 'utf-8');
      const productsJs = JSON.parse(products);
      const updatedProducts = productsJs.map((prod) => {
        if (prod.id === id) {
          return product;
        }
        return prod;
      });
      await fs.promises.writeFile(pathFile, JSON.stringify(updatedProducts));
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id) => {
  try {
    const products = await fs.promises.readFile(pathFile, 'utf-8');
    const productsJs = JSON.parse(products);
    const deletedProduct = productsJs.find((product) => product.id === id);
    const remainingProducts = productsJs.filter((product) => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(remainingProducts));
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
};
