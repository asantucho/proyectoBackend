import Services from './main-services.js';
import MockProductManager from '../daos/mongoDB/managers/mockProducts-manager.js';

const mockProductManager = new MockProductManager();

export default class MockProductService extends Services {
  constructor() {
    super(mockProductManager);
  }
  async createMockProducts(cant) {
    try {
      const products = await this.manager.createMockProducts(cant);
      return products;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getAllMockProducts() {
    try {
      const products = await this.manager.getAllMockProducts();
      return products;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
}
