import Services from './main-services.js';
import productManager from '../daos/persistence.js';

export default class ProductService extends Services {
  constructor() {
    super(productManager);
  }
}
