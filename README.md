# 🛒 E-commerce Marketplace - Backend

API REST para sistema de e-commerce con autenticación JWT, roles de usuario y gestión de productos.

## 🚀 Tecnologías

- **Node.js** 20.x
- **Express** 5.1.0
- **Sequelize** ORM
- **MySQL** (Railway)
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas

## 📋 Características

- ✅ Autenticación con JWT
- ✅ Roles de usuario (ADMIN, CUSTOMER)
- ✅ CRUD de productos
- ✅ CRUD de categorías
- ✅ Filtrado de productos por categoría
- ✅ Protección de rutas según rol
- ✅ CORS configurado para Vercel

## 🔧 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` con las siguientes variables:

```env
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_NAME=tu_base_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3001
JWT_SECRET=tu_secreto_jwt_seguro
FRONTEND_URL=https://tu-frontend.vercel.app
```

## 🗄️ Base de Datos

### Crear datos de prueba

```bash
node seed.js
```

Esto creará:
- 2 roles (ADMIN, CUSTOMER)
- 2 usuarios de prueba
- 5 categorías de ejemplo

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

Servidor: `http://localhost:3001`

## 📡 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil | Sí |

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Listar productos | No |
| GET | `/api/products?categoryId=X` | Filtrar por categoría | No |
| GET | `/api/products/:id` | Obtener producto | No |
| POST | `/api/products` | Crear producto | ADMIN |
| PUT | `/api/products/:id` | Actualizar producto | ADMIN |
| DELETE | `/api/products/:id` | Eliminar producto | ADMIN |

### Categorías

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Listar categorías | No |
| GET | `/api/categories/:id` | Obtener categoría | No |
| POST | `/api/categories` | Crear categoría | ADMIN |
| PUT | `/api/categories/:id` | Actualizar categoría | ADMIN |
| DELETE | `/api/categories/:id` | Eliminar categoría | ADMIN |

## 🔐 Autenticación

### Registro

```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "roleId": 2,
    "role": {
      "id": 2,
      "nombre": "CUSTOMER"
    }
  }
}
```

### Usar Token

```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 👥 Usuarios de Prueba

Después de ejecutar `node seed.js`:

```
Admin:    admin@test.com / admin123
Customer: customer@test.com / customer123
```

## 🗂️ Estructura del Proyecto

```
backend-marketplace/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración Sequelize
│   ├── controllers/
│   │   ├── auth.controller.js   # Login, Register
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js   # JWT verification
│   ├── models/
│   │   ├── index.js             # Relaciones
│   │   ├── User.js
│   │   ├── Role.js
│   │   ├── Category.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categories.js
│   │   └── products.js
│   ├── app.js                   # Express app
│   └── server.js                # Entry point
├── .env                         # Variables de entorno
├── .gitignore
├── package.json
├── render.yaml                  # Config para Render
└── seed.js                      # Seed de datos
```

## 🌐 Despliegue en Render

### 1. Crear Web Service

1. Ve a https://render.com
2. New + → Web Service
3. Conecta tu repositorio
4. Configuración:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

### 2. Variables de Entorno

Agrega en Render Dashboard → Environment:

```
DB_HOST=tu_host
DB_PORT=3306
DB_NAME=tu_database
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3001
JWT_SECRET=secreto_produccion_seguro
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app
```

### 3. Deploy

Click "Create Web Service" y espera 5-10 minutos.

### 4. Crear Datos de Prueba

Usa Render Shell o la API:

```bash
# En Render Shell
node seed.js
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- JWT con expiración de 7 días
- Validación de roles en rutas protegidas
- CORS configurado para dominios específicos

## 📊 Base de Datos

### Modelos

- **Role**: ADMIN, CUSTOMER
- **User**: nombre, email, password, roleId
- **Category**: nombre, descripcion
- **Product**: nombre, precio, descripcion, categoryId, imageUrl

### Relaciones

- User belongsTo Role
- Product belongsTo Category

## 🐛 Troubleshooting

### Error de conexión a BD

Verifica las variables de entorno `DB_*`

### Token inválido

- Verifica que `JWT_SECRET` sea el mismo
- El token expira en 7 días

### CORS error

- Agrega la URL del frontend en `FRONTEND_URL`
- El backend acepta automáticamente dominios `.vercel.app`

## 📝 Scripts

```bash
npm start       # Producción
npm run dev     # Desarrollo con nodemon
npm run seed    # Crear datos de prueba
```

## 📄 Licencia

Proyecto académico - Tecsup DAWA

## 🤝 Contribuir

Este es un proyecto educativo. Para sugerencias, abre un issue.
