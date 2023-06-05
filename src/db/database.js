import mongoose from 'mongoose';

const connectionString =
  'mongodb+srv://masantucho:masantucho@cluster0.noyiw8q.mongodb.net/proyecto-final';

try {
  await mongoose.connect(connectionString);
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(error);
}
