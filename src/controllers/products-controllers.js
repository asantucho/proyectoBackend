import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from '../services/products-services.js';
import 'mongoose-paginate-v2';

export const createProductsController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      status,
      category,
    } = req.body;
    const newProduct = await createProductService({
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      status,
      category,
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProductsController = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const { sort = {}, category } = req.query;

    console.log('sort:', sort);
    console.log('category:', category);

    const options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
      query: {},
      sort: sort ? { price: sort } : {},
    };

    if (category) {
      options.query.category = category;
    }

    const products = await getAllProductsService(options);

    console.log(products);

    if (!products) {
      return res.json({
        status: 'success',
        payload: 0,
        totalPages: 0,
        currentPage: page,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null,
        results: [],
      });
    }

    const nextPage = products.hasNextPage
      ? `http://localhost:8080/products?page=${products.nextPage}&limit=${limit}`
      : null;
    const prevPage = products.hasPrevPage
      ? `http://localhost:8080/products?page=${products.prevPage}&limit=${limit}`
      : null;

    res.json({
      status: 'success',
      payload: products.length,
      pages: products.totalPages,
      currentPage: page,
      hasPrevPage: products.hasPrevPage || 'no previous page',
      hasNextPage: products.hasNextPage || 'no next page',
      prevLink: prevPage,
      nextLink: nextPage,
      results: products,
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
