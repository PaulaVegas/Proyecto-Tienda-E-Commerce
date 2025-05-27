# 🛒 Proyecto E-Commerce API

Backend de una tienda online, desarrollada con Node.js, Express y Sequelize (MySQL). Esta API REST incluye autenticación segura, gestión de usuarios, productos, categorías, pedidos y reseñas, con relaciones avanzadas entre tablas y protección mediante roles.

---

## 📌 Introducción

Este proyecto aplica conocimientos de desarrollo backend con Node.js y Express, junto con Sequelize y MySQL para la gestión de bases de datos relacionales.

El objetivo es construir una API REST para una tienda online (e-commerce) que permita registrar usuarios, gestionar productos y categorías, procesar pedidos, añadir reseñas y manejar autenticación y autorización mediante JWT y roles.

-   🐢 **Node.js + Express**
-   🐬 **MySQL** gestionado con **Sequelize**

---

## 🧩 Descripción del proyecto

API REST capaz de siguiente:

-   🔐 Registro de usuarios usando Bcrypt.
-   🛡️ Login de usuarios + token + middleware.
-   🧠 Que sea capaz de crear un CRUD.
-   🔗 Al menos una relación Many to Many y otra One to Many.
-   🌱 Utilización de seeders

---

## 💥 Requisitos imprescindibles del proyecto:

✅ Uso de ramas Git: deben mantenerse main y develop.

✅ Repositorio público con commits significativos.

✅ README completo y profesional.

✅ Diagrama ER para explicar relaciones entre entidades (presentación).

---

## 🛠️ Tecnologías

-   Node.js
-   Express
-   MySQL
-   Sequelize
-   Bcrypt
-   JWT (JSON Web Tokens)
-   Multer (para imágenes)
-   Git y GitHub

-   Para el desarrollo de la API utilizaremos mysql con Sequelize y express.
-   El proyecto se subirá a un repositorio público de GitHub y se valorará la
    existencia de ramas, así como diversos commits de calidad legible alta para
    analizar la evolución del proyecto.
-   Será requisito indispensable que el repositorio disponga de un Readme
    completo.

---

## 📂 Estructura del Proyecto

-   `/config`  
    Contiene la configuración de la base de datos y otros ajustes globales. Aquí encontrarás el archivo `config.json` donde se definen las credenciales para las diferentes bases de datos (desarrollo, test, producción).

-   `/controllers`  
    Incluye la lógica de negocio para los distintos recursos (productos, categorías, usuarios, pedidos, etc.). Los controladores manejan las solicitudes entrantes, interactúan con los modelos y devuelven respuestas.

-   `/models`  
    Define los modelos Sequelize que representan las tablas de la base de datos y sus relaciones. Aquí se encuentran las definiciones de los esquemas y las asociaciones entre tablas (relaciones One-to-Many, Many-to-Many).

-   `/routes`  
    Define las rutas de la API REST. Cada archivo aquí expone endpoints para un recurso específico y conecta esas rutas con su controlador correspondiente.

-   `/seeders`  
    Contiene los scripts para insertar datos iniciales o de prueba en la base de datos. Estos seeders permiten popular las tablas con información que facilite el desarrollo y las pruebas.

### Archivos raíz

-   `index.js`  
    Archivo principal que arranca el servidor Express y conecta toda la configuración, rutas y middleware necesarios para la aplicación.

-   `README.md`  
    Documento que describe el proyecto, cómo instalarlo, configurarlo y usarlo. Es la guía principal para cualquier persona que quiera entender o colaborar con el proyecto.

---

# 🚀 Cómo ejecutar el proyecto

-   Clona el repositorio

```bash
git clone https://github.com/PaulaVegas/Proyecto-Tienda-E-Commerce.git
```

-   Instala dependencias

```bash
npm install -D nodemon
```

```bash
npm install express sequelize mysql2
```

-   Ingresa tus datos de MySql en **_config.json_** para poder crear la db

```js
"development": {
        "username": "tu usuario",
        "password": "tu constraseña",
        "database": "nombre de la BBDD",
        "host": "localhost",
        "dialect": "mysql"
    }
```

-   Crea la db mediante terminal

```bash
sequelize db:create
```

-   Realiza las migraciones de tablas

```bash
sequelize db:migrate
```

-   Usa los seeders para popular las tablas

```bash
sequelize db:seed:all
```

-   Inicia el servidor

```bash
npm run dev
```

📈 Mejora continua

Diagrama de relaciones entre tablas

## 👨‍💻 Autoras

-   ✍️ Maider
-   🐙 [@Maiderspb](https://www.github.com/Maiderspb)

-   ✍️ Paula
-   🐙 [@PaulaVegas](https://www.github.com/PaulaVegas)
