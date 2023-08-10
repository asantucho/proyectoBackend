import { __dirname } from '../utils.js';
import UsersManagerFS from './file-system/usersManagerFs.js';
import UserManager from './mongoDB/managers/users-manager.js';
import ProductManager from './mongoDB/managers/products-manager.js';
import ProductManagerFs from './file-system/productManager.js';

let productManager;
let userManager;

let persistence = process.argv[2];
console.log('persistence: ', persistence);

switch (persistence) {
  case 'file':
    productManager = new ProductManagerFs(__dirname + '/products.json');
    userManager = new UsersManagerFS(__dirname + '/users.json');
    break;
  case 'mongo':
    productManager = new ProductManager();
    userManager = new UserManager();
    break;
  default:
    productManager = new ProductManager();
    userManager = new UserManager();
    break;
}

console.log('userManager del persistence: ', userManager);

export default { userManager, productManager };
