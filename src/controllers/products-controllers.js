import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from '../services/products-services.js';

export const createProductsController = async (req, res, next) => {
  try {
    const { title, description, price, stock, thumbnail, code, status } =
      req.body;
    const newProduct = await createProductService({
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      status,
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedProduct = await getProductByIdService(id);
    res.json(selectedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, thumbnail, code, status } =
      req.body;
    await getProductByIdService(id);
    const updatedProduct = await updateProductService(
      {
        title,
        description,
        price,
        stock,
        thumbnail,
        code,
        status,
      },
      id
    );
    console.log('updated controller passed');
    return res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductByIdService(id);
    res.json(`${deletedProduct} delected successfully!`);
  } catch (error) {
    next(error);
  }
};
