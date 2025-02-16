import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const MONGO_URI = process.env.MONGO_URI || ''

const testSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
})
const TestModel = mongoose.model('TestCollection', testSchema)

async function testMongoDB() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Conexión exitosa a MongoDB')
    //documento de prueba
    const testDoc = await TestModel.create({ name: 'Prueba MongoDB' })
    console.log('Documento insertado:', testDoc)
    //consulta a documento insertado
    const foundDocs = await TestModel.find({})
    console.log('Documentos encontrados:', foundDocs)
    await mongoose.disconnect()
    console.log('Conexión cerrada')
  } catch (error) {
    console.log('❌Error de conexion a MongoDB', Error)
  }
}
testMongoDB()
