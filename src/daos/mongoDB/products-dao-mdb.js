import { productsModel } from './models/products-model.js';

export default class ProductsDaoMongo {
  async createProduct(object) {
    try {
      const newProduct = await productsModel.create(object);
      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllProducts(page = 1, limit = 0) {
    try {
      const response = await productsModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      const response = await productsModel.findById(id);
      if (!response) throw new Error('product not found');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(object, id) {
    try {
      const updatedProduct = await productsModel.findByIdAndUpdate(id, object, {
        new: true,
      });
      console.log('product dao passed');
      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteProductById(id) {
    try {
      await productsModel.findByIdAndDelete(id);
      console.log(`product with id ${id} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  }
  async aggregation(category) {
    try {
      const response = await productsModel.aggregate([
        {
          $match: { category: `${category}` },
        },
        {
          $group: {
            _id: '$category',
            cheapest: { $min: '$price' },
            mostExpensive: { $max: '$price' },
          },
        },
        {
          $sort: {
            cheapest: 1,
          },
        },
      ]);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
