import mongoose from 'mongoose';
import { productsModel } from './products-model.js';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: productsModel,
      },
      quantity: Number,
    },
  ],
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
