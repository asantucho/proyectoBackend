import { mockProductsModel } from '../models/mockProducts-model.js';
import MainClass from '../main-class.js';
import { generateProduct } from '../../../utils/faker.js';

export default class MockProductManager extends MainClass {
  constructor() {
    super(mockProductsModel);
  }
  createMockProducts = async (cant = 100) => {
    const mockProducts = [];
    for (let i = 0; i <= cant; i++) {
      const product = generateProduct();
      mockProducts.push(product);
    }
    const products = mockProductsModel.create(mockProducts);
    return products;
  };
  getAllMockProducts = async () => {
    try {
      const products = mockProductsModel.find({});
      return products;
    } catch (error) {
      console.log(error);
    }
  };
}
