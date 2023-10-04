import 'dotenv/config';

export default {
  MONGO_URL_DEV: process.env.MONGO_URL_DEV,
  MONGO_URL_PROD: process.env.MONGO_URL_PROD,
  MONGO_URL_TEST: process.env.MONGO_URL_TEST,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  ENV: process.env.ENV,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
};
