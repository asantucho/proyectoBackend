import mongoose from 'mongoose';
import { cartsModel } from './carts-model.js';

export const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: cartsModel },
  isGoogle: { type: Boolean, required: false, default: false },
});

usersSchema.pre('save', async function (next) {
  if (!this.cart) {
    const newCart = await cartsModel.create({});
    this.cart = newCart._id;
  }
  next();
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
