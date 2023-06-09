import ProductsDaoMongo from '../daos/mongoDB/products-dao-mdb.js';

const productMongo = new ProductsDaoMongo();

export const createProductService = async (object) => {
  try {
    const docs = await productMongo.createProduct(object);
    console.log(docs);
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsService = async (page, limit) => {
  try {
    const docs = await productMongo.getAllProducts(page, limit);
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByIdService = async (id) => {
  try {
    const doc = await productMongo.getProductById(id);
    return doc;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProductService = async (object, id) => {
  try {
    const updatedDoc = await productMongo.updateProduct(object, id);
    console.log('updated product services passed');
    return updatedDoc;
  } catch (error) {
    console.log(error);
    throw new Error('Error occurred while updating the product');
  }
};

export const deleteProductByIdService = async (id) => {
  try {
    const deletedProduct = await productMongo.deleteProductById(id);
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
};

export const aggregationService = async (category) => {
  try {
    const categories = await productMongo.aggregation(category);
    return categories;
  } catch (error) {
    console.log(error);
  }
};
