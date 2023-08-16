import mongoose from 'mongoose';
import { usersCollection } from './users-model.js';
import { productsCollection } from './products-model.js';

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: usersCollection },
  productsPurchased: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: productsCollection,
      },
      quantity: { type: Number },
      subtotal: { type: Number },
    },
  ],
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);
