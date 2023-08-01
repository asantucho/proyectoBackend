import mongoose from 'mongoose';
import { cartsModel } from './carts-model.js';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: cartsModel },
  isGoogle: { type: Boolean, required: false, default: false },
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
