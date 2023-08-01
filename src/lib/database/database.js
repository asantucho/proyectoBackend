import mongoose from 'mongoose';
import 'dotenv/config';

const connectionString = process.env.MONGO_URL;

try {
  await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 30000 });
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(error);
}
