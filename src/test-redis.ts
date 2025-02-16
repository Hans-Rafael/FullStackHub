import Redis from 'ioredis'
import * as dotenv from 'dotenv'

dotenv.config()

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
  console.log('Redis_URL no esta definido')
  process.exit(1)
}
// Crear cliente Redis con ioredis
const redis = new Redis(redisUrl)

redis.on('connect', () => console.log('Conexion exitosa a Redis'))
redis.on('error', (err) => console.error('error en Redis', err))

async function testRedis() {
  try {
    // Guardar un valor en Redis
    await redis.set('testKey', 'Hola ioredis', 'EX', 60) // Expira en 60 segundos
    console.log('✅ Valor almacenado en Redis')

    // Recuperar el valor
    const value = await redis.get('testKey')
    console.log('🔹 Valor recuperado:', value)

    // Cerrar conexión
    await redis.quit()
  } catch (error) {
    console.error('❌ Error en la prueba de Redis:', error)
  }
}

testRedis()
