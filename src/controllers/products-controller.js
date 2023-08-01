import Controller from './main-controller.js';
import ProductService from '../services/product-services.js';

const productService = new ProductService();

export default class ProductController extends Controller {
  constructor() {
    super(productService);
  }
}
