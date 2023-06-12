import mongoose from 'mongoose';
import { productsModel } from './products-model.js';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: productsModel,
    },
  ],
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
