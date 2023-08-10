import { usersModel } from '../models/users-model.js';
import MainClass from '../main-class.js';
import { createHash, isValidPassword } from '../../../utils.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

export default class UserManager extends MainClass {
  constructor() {
    console.log('UserManager constructor called');
    super(usersModel);
  }
  #generateToken(user) {
    if (!SECRET_KEY) {
      console.log('Error: SECRET_KEY is not set.');
      return;
    }
    try {
      console.log('generate Token user', user);
      const payload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      console.log('generateToken payload:', payload);
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '10m',
      });
      return token;
    } catch (error) {
      console.log('error en generateToken: ', error);
    }
  }
  getByEmail = async (email) => {
    try {
      console.log('getByEmail called with email:', email);
      const existingUser = await this.model.findOne({ email }).exec();
      console.log('existingUser: ', existingUser);
      if (existingUser) {
        return existingUser;
      } else return false;
    } catch (error) {
      console.log('error en el user-manager(getByEmail)', error);
    }
  };
  register = async (user) => {
    try {
      console.log('user que recibe el register: ', user);
      const { email, password } = user;
      console.log('Register method called with user:', user);
      const registeredUser = await this.getByEmail(email);
      console.log('Registered user:', registeredUser);
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
      console.log('newUser: ', newUser);
      const token = this.#generateToken(newUser);
      console.log('Token generated:', token);
      console.log('paso exitosamente el dao');
      return token;
    } catch (error) {
      console.log('error en el user-manager(register):', error);
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
      console.log('error en el manager', error);
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
      console.log(error);
    }
  };
}
