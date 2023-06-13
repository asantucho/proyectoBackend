import mongoose from 'mongoose';
import { productsModel } from './products-model.js';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema(
  {
    products: [
      {
        prodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: productsModel,
        },
        quantity: Number,
      },
    ],
  }
  //{ _id: false }
);

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
