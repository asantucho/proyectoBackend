import mongoose from 'mongoose';
import config from '../config/config.js';

let ENV = config.ENV;
export let connectionString = config.MONGO_URL_DEV;

switch (ENV) {
  case 'DEV':
    connectionString = config.MONGO_URL_DEV;
    console.log('local database');
    break;
  case 'PROD':
    connectionString = config.MONGO_URL_PROD;
    console.log('production database');
    break;
  case 'TEST':
    connectionString = config.MONGO_URL_TEST;
    console.log('testing database');
    break;
  default:
    connectionString = config.MONGO_URL_DEV;
    console.log('local database');
    break;
}

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log(`Conectado a la base de datos de MongoDB || ENV: ${ENV}`);
  } catch (error) {
    console.log(error);
  }
};
