# 📒 Bitácora de Desarrollo – Módulo de Categorías y Seeders

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
| /05/2025 | Testeo completo de endpoints y relaciones                | ⏳ En curso |

---

## 🛠️ Desarrollo de funcionalidades

### 1. 🧱 Modelo Category

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
🧱 Modelo Category

### 2. 🔁 Relación Many-to-Many con Product
Se definió la relación many-to-many entre Product y Category usando una tabla intermedia llamada ProductCategories.

En el modelo Product.js también se definió la relación inversa.

### 3. 🚦 Endpoints implementados
```js
router.post('/', CategoryController.create); // Crear categoría
router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.update); // Actualizar categoría
router.get('/:id', CategoryController.getById); // Mostrar categoría por Id
router.delete('/:id', CategoryController.delete); // Borrar categoría
router.get('/search/name/:name', CategoryController.getOneByName); // Buscar por nombre
```

### 4. 🌱 Seeders
Seeder para insertar 5 categorías:

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
También añadido seeder de productos y de productcategories

## 🧪 Testeo de endpoints

Probado con Postman:

- ✔ `/categories` devuelve todas con productos.
- ✔ CRUD completo probado y funcional. 

---

## 🧩 Problemas encontrados

- El modelo `Product` no tenía aún relación definida al principio, por lo que tuve que esperar a su implementación para probar correctamente las asociaciones.
- Tuvimos que acordar el nombre exacto de la tabla intermedia `ProductCategories` para que Sequelize no generara una por defecto incorrecta.

---

## 📌 Mejoras pendientes o sugerencias

---



## 📍 Commits importantes

| Fecha       | Mensaje de commit                           | Rama      |
|-------------|----------------------------------------------|-----------|
| 27/05/2025  |   `feat: working intermediate ProductCategory table with correct interrelations`| feature/categories   |
| 27/05/2025  |     `feat: seeders added `     | feature/categories  |
| 27/05/2025  | `feat: seeder de categorías`                 | feature/categories  |