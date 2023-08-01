import Services from './main-services.js';
import ProductManager from '../daos/managers/products-manager.js';

const productManager = new ProductManager();

export default class ProductService extends Services {
  constructor() {
    super(productManager);
  }
}
