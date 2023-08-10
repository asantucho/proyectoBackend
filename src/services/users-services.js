import Services from './main-services.js';
import persistence from '../daos/persistence.js';

const { userManager } = persistence;

export default class UserService extends Services {
  constructor() {
    console.log('UserService constructor called');
    super(userManager);
  }
  async register(user) {
    try {
      const token = await this.manager.register(user);
      console.log('paso exitosamente el service');
      return token;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getByEmail(email) {
    try {
      const existingUser = await this.manager.getByEmail(email);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async login(user) {
    try {
      const existingUser = await this.manager.login(user);
      return existingUser;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async profile(id) {
    try {
      const userProfile = await this.getById(id);
      return userProfile;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
}
