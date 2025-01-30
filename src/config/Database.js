import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno

dotenv.config();

export const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};


