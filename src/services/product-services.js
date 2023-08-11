import Services from './main-services.js';
import persistence from '../daos/persistence.js';

const { productManager } = persistence;

export default class ProductService extends Services {
  constructor() {
    super(productManager);
  }
}
