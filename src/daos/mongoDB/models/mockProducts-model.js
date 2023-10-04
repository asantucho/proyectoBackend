import mongoose from 'mongoose';

const mockProductsCollection = 'mockProducts';

const mockProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

export const mockProductsModel = mongoose.model(
  mockProductsCollection,
  mockProductsSchema
);
