import Controller from './main-controller.js';
import UserService from '../services/users-services.js';
import { createResponse } from '../utils.js';

const userService = new UserService();

export default class UserController extends Controller {
  constructor() {
    console.log('UserController constructor called');
    super(userService);
  }
  register = async (req, res, next) => {
    try {
      const token = await this.service.register(req.body);
      createResponse(res, 200, token);
      console.log('paso exitosamente el controller');
    } catch (error) {
      next(error.message);
    }
  };
  login = async (req, res, next) => {
    try {
      const userExists = await this.service.login(req.body);
      userExists
        ? createResponse(res, 200, userExists)
        : createResponse(res, 404, {
            method: 'login',
            error: 'Validation error',
          });
    } catch (error) {
      next(error.message);
    }
  };
  profile = async (req, res, next) => {
    try {
      const { firstName, lastName, email, role } = req.user;
      createResponse(res, 200, {
        firstName,
        lastName,
        email,
        role,
      });
    } catch (error) {
      next(error.message);
    }
  };
  getByEmail = async (req, res, next) => {
    try {
      const existingUser = await this.service.getByEmail(req.user);
      createResponse(res, 200, existingUser);
    } catch (error) {
      next(error);
    }
  };
}
