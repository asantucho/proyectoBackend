import { usersModel } from '../models/users-model.js';
import MainClass from '../main-class.js';
import { createHash, isValidPassword } from '../../../utils/utils.js';
import jwt from 'jsonwebtoken';
import { developmentLogger, productionLogger } from '../../../utils/loggers.js';
import config from '../../../config/config.js';

const SECRET_KEY = config.SECRET_KEY;

export default class UserManager extends MainClass {
  constructor() {
    super(usersModel);
  }
  #generateToken(user) {
    if (!SECRET_KEY) {
      if (config.ENV === 'PROD') {
        productionLogger.error("'Error: SECRET_KEY is not set.'");
      } else {
        developmentLogger.error('Error: SECRET_KEY is not set.');
      }
      return;
    }
    try {
      const payload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '10m',
      });
      return token;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error("'Error: could not generate token.'");
      } else {
        developmentLogger.error('Error: could not generate token.');
      }
    }
  }
  getByEmail = async (email) => {
    try {
      const existingUser = await this.model.findOne({ email }).exec();
      if (existingUser) {
        return existingUser;
      } else return false;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error('Error: could not find the user.');
      } else {
        developmentLogger.error('Error: could not find the user.');
      }
    }
  };
  register = async (user) => {
    try {
      const { email, password } = user;
      const registeredUser = await this.getByEmail(email);
      if (!registeredUser) {
        if (email === 'adminCoder@coder.com' && password === 'adminCoder123') {
          const newUser = await usersModel.create({
            ...user,
            password: createHash(password),
            role: 'admin',
          });
          return newUser;
        } else {
          const newUser = await usersModel.create({
            ...user,
            password: createHash(password),
            role: 'user',
          });
          return newUser;
        }
      }
      const token = this.#generateToken(newUser);
      return token;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error('Error: could not register the user');
      } else {
        developmentLogger.error('Error: could not register the user');
      }
    }
  };
  login = async (user) => {
    try {
      const { email, password } = user;
      const existingUser = await this.getByEmail(email);
      if (existingUser) {
        const correctPassword = isValidPassword(existingUser, password);
        if (!correctPassword) return false;
        else {
          const token = this.#generateToken(existingUser);
          return token;
        }
      }
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error('Error: could not login');
      } else {
        developmentLogger.error('Error: could not login');
      }
    }
  };
  profile = async (token) => {
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      const userId = decodedToken.userId;
      const userProfile = await this.model.findById(userId).exec();
      if (userProfile) {
        return userProfile;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error('Error: could not get the profile');
      } else {
        developmentLogger.error('Error: could not get the profile');
      }
    }
  };
}
