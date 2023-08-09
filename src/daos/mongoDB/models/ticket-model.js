import mongoose from 'mongoose';
import { usersModel } from './users-model.js';

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  purchase_datetime: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: usersModel },
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);
