import { productsModel } from '../models/products-model.js';
import MainClass from '../main-class.js';

export default class ProductManager extends MainClass {
  constructor() {
    super(productsModel);
  }
}
