¡Por supuesto! Aquí tienes el README en formato Markdown:

```markdown
# Backend Project

## Descripción

Este proyecto es un backend para una aplicación web, construido con NestJS y TypeScript. Utiliza JWT para autenticación, PostgreSQL y MongoDB como bases de datos, y Redis para caché. El proyecto está configurado para funcionar con Docker Compose y tiene pruebas unitarias y end-to-end.

## Requisitos

- Node.js v14 o superior
- Docker y Docker Compose
- PostgreSQL
- MongoDB
- Redis

## Configuración

1. **Clonar el repositorio**:

   ```sh
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
   ```

2. **Instalar dependencias**:

   ```sh
   npm install
   ```

3. **Configurar las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```plaintext
   DATABASE_URL=postgres://usuario:password@localhost:5432/nombre_base_de_datos
   MONGO_URL=mongodb://localhost:27017/nombre_base_de_datos
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=tuClaveSecretaParaJWT
   ```

## Uso de Docker

1. **Construir y correr los contenedores**:

   ```sh
   docker-compose up --build
   ```

2. **Detener y eliminar los contenedores**:

   ```sh
   docker-compose down
   ```

## Rutas API

### Autenticación

- **POST** `/auth/login`: Inicia sesión y obtiene un token JWT.

### Tareas

- **GET** `/tasks`: Obtiene todas las tareas. (Requiere autenticación)
- **GET** `/tasks/:id`: Obtiene una tarea por ID. (Requiere autenticación)
- **POST** `/tasks`: Crea una nueva tarea. (Requiere autenticación)
- **PUT** `/tasks/:id`: Actualiza una tarea existente. (Requiere autenticación)
- **DELETE** `/tasks/:id`: Elimina una tarea. (Requiere autenticación)

### Usuarios

- **GET** `/users/:id`: Obtiene un usuario por ID. (Requiere autenticación)
- **POST** `/users`: Crea un nuevo usuario. (Requiere autenticación)

## Scripts Disponibles

- **Iniciar el servidor**:

  ```sh
  npm run start
  ```

- **Iniciar el servidor en modo de desarrollo**:

  ```sh
  npm run start:dev
  ```

- **Ejecutar pruebas unitarias**:

  ```sh
  npm run test
  ```

- **Ejecutar pruebas end-to-end**:

  ```sh
  npm run test:e2e
  ```

- **Verificar y corregir errores de linting**:

  ```sh
  npm run lint
  npm run lint -- --fix
  ```

## Pruebas

Este proyecto incluye pruebas unitarias y end-to-end para asegurar la calidad del código.

### Pruebas Unitarias

Las pruebas unitarias se encuentran en los archivos con extensión `.spec.ts` dentro del directorio `src`.

### Pruebas End-to-End

Las pruebas end-to-end se encuentran en el directorio `test`.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
```