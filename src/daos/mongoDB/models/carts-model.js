import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
