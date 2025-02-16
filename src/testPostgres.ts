import { Sequelize, Model, DataTypes } from 'sequelize'
import * as dotenv from 'dotenv'

// Cargar las variables de entorno desde .env
dotenv.config()

const postgresUrl = process.env.POSTGRES_URL

if (!postgresUrl) {
  console.error('POSTGRES_URL no está definida')
  process.exit(1) // Salir si la variable no está definida
}
// Crear instancia de Sequelize
const sequelize = new Sequelize(postgresUrl)
// Definir un modelo temporal
class TestModel extends Model {}
TestModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Conexión a la base de datos
    modelName: 'TestModel', // Nombre interno del modelo
    tableName: 'test_table', // Nombre real de la tabla en la BD
  },
)
// Función para probar la conexión y realizar una operación CRUD
const testDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión exitosa a PostgreSQL')

    await sequelize.sync({ force: true }) // Crea la tabla desde cero(elimina si ya existe)
    console.log('Tabla sincronizada')

    // insertar registro de prueba
    await TestModel.create({ name: 'Prueba Sequelize' })
    console.log('Registro insertado')
    //leer registros
    const records = await TestModel.findAll()
    console.log(
      'Registros encontrados:',
      records.map((r) => r.toJSON()),
    )
  } catch (err) {
    console.error('❌ Error al verificar PostgreSQL:', err)
  } finally {
    await sequelize.close()
  }
}
// Ejecutar la prueba
testDatabase()
/* sequelize 
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL:', err);
  });
 */
