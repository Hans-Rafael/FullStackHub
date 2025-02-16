import { MongooseModule } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config() // Carga las variables de entorno desde el archivo .env

const MONGODB_URI = process.env.MONGO_URI || ''

mongoose.connection.on('connected', () => {
  console.log('Conexión exitosa a MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión a MongoDB:', err)
})

export const connectToMongoDB = MongooseModule.forRoot(MONGODB_URI)

/* const connectToMongoDB = async () => {
  try {
    // Sin las opciones `useNewUrlParser` y `useUnifiedTopology`
    await mongoose.connect(MONGO_URI);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }
};

export default connectToMongoDB; */
