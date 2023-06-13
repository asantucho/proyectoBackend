import { productsModel } from './models/products-model.js';

export default class ProductsDaoMongo {
  async createProduct(object) {
    try {
      const newProduct = await productsModel.create(object);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllProducts(options = {}) {
    try {
      const { limit = 0, page = 1, query = {}, sort = {} } = options;

      let aggregationPipeline = [];
      if (query?.category) {
        aggregationPipeline.push({
          $match: { category: query.category },
        });
      }
      if (sort?.price) {
        const sortOrder = sort.price === 'asc' ? 1 : -1;
        aggregationPipeline.push({
          $sort: { price: sortOrder },
        });
      }
      if (aggregationPipeline.length === 0) {
        const response = await productsModel.paginate({}, { page, limit });
        console.log('Returning from if (aggregationPipeline.length === 0)');
        return response;
      }
      aggregationPipeline = [
        ...aggregationPipeline,
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ];
      const response = await productsModel.aggregate(aggregationPipeline);
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
}
