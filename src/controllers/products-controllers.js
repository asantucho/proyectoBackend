import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  aggregationService,
} from '../services/products-services.js';
import 'mongoose-paginate-v2';

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
    const { page, limit } = req.params;
    const products = await getAllProductsService(page, limit);

    const nextPage = products.hasNextPage
      ? `http://localhost:8080/products?page=${products.nextPage}&limit=${limit}`
      : null;
    const prevPage = products.hasPrevPage
      ? `http://localhost:8080/products?page=${products.prevPage}&limit=${limit}`
      : null;

    res.json({
      status: 'success',
      payload: products.doc.length,
      totalPages: products.totalPages,
      currentPage: page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: prevPage,
      nextLink: nextPage,
      results: products.doc,
    });
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

export const aggregationController = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categories = await aggregationService(category);
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
