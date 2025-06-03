# 📒 Bitácora de Desarrollo – Módulo de Categorías, Usuarios y Seeders

### 🧑‍💻 Alumno: [Paula]  
### 🗓️ Proyecto: E-commerce (API REST con Node, Express, Sequelize y MySQL)  
### 🧩 Parte asignada: Gestión de Categorías, Users y Seeders  


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
| 30/05/2025 | Crear controlador de usuario                           | ✅ Hecho|
| 30/05/2025 | Implementar bcrypt para usuarios                        | ✅ Hecho |
| 30/05/2025 | CRUD de users        | ✅ Hecho |
| 30/05/2025 | Implementación de multer    | ✅ Hecho |
| /06/2025 | Testeo completo de endpoints y relaciones                | ⏳ En curso |

---

## 🛠️ Desarrollo de funcionalidades

### 1 MODELOS
### 1.1 🧱 Modelo Category

```js
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
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
            User.hasMany(models.Order, {
                foreignKey: 'UserId',
                as: 'orders',
            });

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
Seeder para insertar categorías, products, users:
Ejemplo:

```js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Products', [
            {
                id: 1,
                name: 'Camiseta básica',
                price: 12.99,
                description: 'Camiseta de algodón 100% en varios colores.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Zapatillas deportivas',
                price: 59.9,
                description: 'Zapatillas para correr con suela amortiguada.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Products', null, {});
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
- ✔ CRUD completo de *categories* probado y funcional. 
- ✔ CRUD completo de *users* probado y funcional. 
- ✔ `/users` devuelve todos con sus pedidos.
- ✔ Conectar los modelos de usuarios y pedidos
  
---

# 🧩 Problemas encontrados

- El modelo `Product` no tenía aún relación definida al principio, por lo que tuve que esperar a su implementación para probar correctamente las asociaciones.
- Tuvimos que acordar el nombre exacto de la tabla intermedia `ProductCategories` para que Sequelize no generara una por defecto incorrecta.
- Restablecimiento de modelo `ProductCategory` y migración `productcategories` restablecida después de pérdida en commit anterior.
- Las relaciones y migraciones estaban mal establecidas.
- En la tabla `Orders` username aparece null, habría que corregir el controlador  para que coja el usuario de forma dinámica
- Ejemplo:
```js
const orders = await Order.findAll({
  where: { UserId: userId },  
  include: [
    {
      model: User,
      attributes: ['username'],
      as: 'User' 
    }
  ]
});
```
- En la tabla `Orders` no aparecen los productos

- El viernes 30/05 a las 17 _compañera_ hace un commit *99ddd02* llamado `Products validations and authentications`. En ese commit, entre otros cambios, está el fichero de la migración `product-categories` vacío. _Compañera_ dice que, en ese estado del fichero, todo le funciona perfectamente.
- El viernes 30/05 a las 18 asistimos a la clase de validaciones, tras la cual actualizo el código para añadir lo aprendido; primero en mi rama feature/userauth, y después a develop. Todo funcionaba correctamente.
- Se realiza reunión el domingo por la mañana, donde nos mostramos mutuamente el funcionamiento desde nuestros ordenadores. Procedo a arreglar errores e inconsistencias del código:
En models/reviews corrijo
 ```js  
 `SELECT id FROM "Products";`
 `SELECT id FROM "Users";`
 ```
 por
 ```js
 `SELECT id FROM Products;`
 `SELECT id FROM Users;`
```
y 

```js
Review.belongsTo(models.Product, {
                foreignKey: 'ProductId',
                as: 'product',
            });
```            

En el OrderController añado la línea
```js
as: 'products',
```

Para que asocie correctamente el pedido con los productos.
Añado el endpoint `getUserWithOrders` al UserController y creo la ruta.
Hago un seeder de la tabla intermedia `OrderProducts` ya que estaba vacía.
Compruebo que todo funcione correctamente con una instalación limpia de la db, y subo un vídeo confirmándolo en `assets` (demo_endpoints.mp4)  
- Domingo por la tarde _compañera_ llama por telefóno diciendo que no le funciona el código. Por imposibilidad de arreglarlo de forma telefónica, se queda en mirarlo en clase al día siguiente.
- Domingo sobre las 00:00 _compañera_ hace un commit a la rama `develop` llamado `Screen Captures Added` con las siguientes modificaciones:
- Carpeta `middlewares`, archivo `authentication.js`:
*DESAPARECE*    
```js
const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
```

y 

```js
const isAdmin = async (req, res, next) => {
    const admins = ['admin', 'superadmin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permisos',
        });
    }
    next();
};
```

- Crea dentro de la carpeta `routes` un archivo `login.js` (completamente innecesario ya que ya existía su controlador en `UserController` y la ruta en `routes/user.js`)
- En el archivo `routes/product.js` borra el endpoint `router.post('/', upload.single('image'), ProductController.createProduct);`, creado para poder añadir una foto con multer a un producto que ya estuviera creado. 
- En index.js añade 
```js
app.use('/login', loginRouter);
```

---

## 📌 Mejoras pendientes o sugerencias
  
- Testear todos los endpoints
  
---



## 📍 Commits importantes

| Fecha       | Mensaje de commit                           | Rama      |
|-------------|----------------------------------------------|-----------|
| 27/05/2025  |   `feat: working intermediate ProductCategory table with correct interrelations`| feature/categories   |
| 27/05/2025  |     `feat: seeders added `     | feature/categories  |
| 27/05/2025  | `feat: seeder de categorías`                 | feature/categories  |
| 29/05/2025  | `feat: fixed migrations and models`                 | feature/userauth |
| 30/05/2025  | `feature: upload product images with multer`                | feature/multer|
