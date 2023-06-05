import mongoose from 'mongoose';

const connectionString =
  'mongodb+srv://masantucho:masantucho@cluster0.noyiw8q.mongodb.net/desafio';

try {
  await mongoose.connect(connectionString);
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(error);
}

// export const disconnectMongoDB = async () => {
//   try {
//     await mongoose.disconnect();
//     console.log('disconnected from MongoDB');
//   } catch (error) {
//     console.log(error);
//   }
// };
