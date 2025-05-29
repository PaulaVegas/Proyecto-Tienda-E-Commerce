# 📒 Bitácora de Desarrollo – Módulo de Categorías, Usuarios y Seeders

### 🧑‍💻 Alumno: [Paula]  
### 🗓️ Proyecto: E-commerce (API REST con Node, Express, Sequelize y MySQL)  
### 🧩 Parte asignada: Gestión de Categorías y Seeders  


---

## ✅ Tareas planificadas

| Fecha       | Tarea                                                   | Estado  |
|------------|----------------------------------------------------------|---------|
| 27/05/2025 | Crear modelo de `Category` con validaciones básicas      | ✅ Hecho |
| 27/05/2025 | Crear las tabla intermedia ProductCategory con relaciones| ✅ Hecho |
| 27/05/2025 | Crear las rutas CRUD para categorías                     | ✅ Hecho |
| 27/05/2025 | Agregar filtros por nombre                               | ✅ Hecho |
| 27/05/2025 | Crear relación con `Product` (Many-to-Many)              | ✅ Hecho |
| 27/05/2025 | Crear endpoint para ver categorías con productos         | ✅ Hecho |
| 27/05/2025 | Crear seeder con 5 categorías                            | ✅ Hecho |
| 27/05/2025 | Crear seeder con 5 categorías                            | ✅ Hecho |
| /05/2025 | Crear controlador de usuario                           | ⏳ En curso |
| /05/2025 | Implementar bcrypt para usuarios                        | ⏳ En curso |
| 27/05/2025 | CRUD de users        | ⏳ En curso |
| /05/2025 | Testeo completo de endpoints y relaciones                | ⏳ En curso |

---

## 🛠️ Desarrollo de funcionalidades

### 1 MODELOS
### 1.1 🧱 Modelo Category

```js
// models/Category.js
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // Una categoría tiene muchos productos
            Category.belongsToMany(models.Product, {
                through: 'ProductCategory',
            });
        }
    }

    Category.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Category',
        }
    );

    return Category;
};
```
### 1.2 🧱 Modelo Users
```js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Un usuario tiene muchos pedidos (Orders)
            User.hasMany(models.Order, {
                foreignKey: 'UserId',
                as: 'orders',
            });

            // Un usuario puede tener muchos tokens (por ejemplo, para sesiones)
            User.hasMany(models.Token, {
                foreignKey: 'UserId',
                as: 'tokens',
            });
        }
    }

    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
```
---

### 2. 🔁 Relaciones
#### Producto y Categoría: relación many-to-many vía ProductCategories.

Un producto puede pertenecer a varias categorías y una categoría puede tener varios productos.

En una tienda, un producto puede ser categorizado de distintas maneras. Por ejemplo, un libro puede estar en la categoría "Libros" pero también en "Ofertas".

Una categoría "Libros" contendrá muchos productos diferentes.

Esto implica que la relación no es uno a uno ni uno a muchos, sino muchos a muchos.

Para representarlo en la base de datos se usa una tabla intermedia (join table) llamada ProductCategories con referencias a ambas tablas.

#### Producto y Order: relación many-to-many vía OrderProducts.
Un pedido (order) puede contener varios productos y un producto puede estar en varios pedidos.

Un pedido normalmente contiene uno o varios productos (ejemplo: compras de varios artículos en la misma orden).

Un producto puede ser comprado en muchas órdenes diferentes por distintos clientes.

Por eso, esta es otra relación muchos a muchos.

Se modela con una tabla intermedia OrderProducts que asocia productos y pedidos, además usualmente almacenando la cantidad y precio del producto en el pedido.

#### Order y Usuario: relación muchos a uno (un usuario tiene muchas órdenes).
Un usuario puede hacer muchos pedidos, pero cada pedido pertenece a un solo usuario.

Cada pedido está hecho por un único cliente (usuario) que realizó la compra.

Un usuario puede tener historial de múltiples pedidos a lo largo del tiempo.

Esto es una relación uno a muchos:

Uno (usuario) → muchos (pedidos)

Se guarda la clave foránea UserId en la tabla Orders.
#### Usuario y Token: relación uno a muchos.
Un usuario puede tener muchos tokens (por ejemplo, para sesiones o autenticación).

Los tokens se usan para controlar sesiones, autenticación, refresco de sesión, etc.

Un usuario puede iniciar sesión en varios dispositivos, generando varios tokens activos.

Esta es una relación uno a muchos:

Uno (usuario) → muchos (tokens)

Se guarda la clave foránea UserId en la tabla Tokens.

--- 

### 3. 🚦 Endpoints implementados
```js
router.post('/', CategoryController.create); // Crear categoría
router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.update); // Actualizar categoría
router.get('/:id', CategoryController.getById); // Mostrar categoría por Id
router.delete('/:id', CategoryController.delete); // Borrar categoría
router.get('/search/name/:name', CategoryController.getOneByName); // Buscar por nombre
```

---

### 4. 🌱 Seeders
Seeder para insertar categorías, products, etc:
Ejemplo:

```js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Categories', [
            {
                name: 'Libros',
                description: 'Categoría para libros y material de lectura.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Tecnología',
                description: 'Productos tecnológicos y gadgets.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Ropa',
                description: 'Prendas de vestir y accesorios de moda.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Deportes',
                description: 'Equipamiento y ropa deportiva.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Accesorios',
                description: 'Complementos y accesorios varios.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Ofertas',
                description:
                    'Productos con descuentos y promociones especiales.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Categories', null, {});
    },
};

```

Ejecutado con:

```bash
npx sequelize-cli db:seed:all
```

---

## 🧪 Testeo de endpoints

Probado con Postman:

- ✔ `/categories` devuelve todas con productos.
- ✔ CRUD completo probado y funcional. 
- X `/users` devuelve todos con sus pedidos.

---

## 🧩 Problemas encontrados

- El modelo `Product` no tenía aún relación definida al principio, por lo que tuve que esperar a su implementación para probar correctamente las asociaciones.
- Tuvimos que acordar el nombre exacto de la tabla intermedia `ProductCategories` para que Sequelize no generara una por defecto incorrecta.
- Restablecimiento de modelo `ProductCategory` y migración `productcategories` restablecida después de pérdida en commit anterior...
- Las relaciones y migraciones estaban mal establecidas.
  
---

## 📌 Mejoras pendientes o sugerencias
- Conectar los modelos de usuarios y pedidos
- Testear todos los endpoints
  
---



## 📍 Commits importantes

| Fecha       | Mensaje de commit                           | Rama      |
|-------------|----------------------------------------------|-----------|
| 27/05/2025  |   `feat: working intermediate ProductCategory table with correct interrelations`| feature/categories   |
| 27/05/2025  |     `feat: seeders added `     | feature/categories  |
| 27/05/2025  | `feat: seeder de categorías`                 | feature/categories  |
| 29/05/2025  | `feat: fixed migrations and models`                 | develop |