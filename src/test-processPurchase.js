import { cartsModel } from './daos/mongoDB/models/carts-model.js';
import { usersModel } from './daos/mongoDB/models/users-model.js';
import './lib/jwt/jwt.js';
import config from './config/config.js';
import jwt from 'jsonwebtoken';

const secretKey = config.SECRET_KEY;
const user = { _id: '64d6b00808434043f942d97f', role: 'user' };

const newCart = await cartsModel.create({});
user.cart = newCart._id;
await user.save();

const token = jwt.sign(user, secretKey);

export default token;
