# 🛒 Proyecto E-Commerce API

Backend de una tienda online con autenticación, relaciones entre tablas y gestión de datos con Sequelize + MySQL.

---

## 📌 Introducción

En el proyecto de backend se combinan los conocimientos adquiridos en Node.js y Express, junto con MySQL y Sequelize para la gestión de bases de datos relacionales.

El objetivo es desarrollar una API REST para una tienda online (e-commerce), donde se gestionen usuarios, productos, categorías y pedidos, incluyendo la implementación de autenticación y relaciones entre tablas.

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

-   Uso de _ramas_ con git, cuando se termine el proyecto deberán quedar dos ramas la `master o main` y la `develop`.

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

### 📂 Estructura del Proyecto
- `/assets`
  Contiene diversas capturas de pantalla que muestran el bd schema y los endpoints testados en postman.

- `/bitacora`
Bitácora de desarrollo del proyecto.

- `/config`  
  Contiene la configuración de la base de datos y otros ajustes globales. Aquí encontrarás el archivo `config.json` donde se definen las credenciales para las diferentes bases de datos (desarrollo, test, producción).

- `/controllers`  
  Incluye la lógica de negocio para los distintos recursos (productos, categorías, usuarios, pedidos, etc.). Los controladores manejan las solicitudes entrantes, interactúan con los modelos y devuelven respuestas.

- `/middlewares`
Para verificación de niveles de acceso y autenticación.

- `/migrations`
  Con todas las migraciones necesarias para tener nuestra db creada de forma correcta.

- `/models`  
  Define los modelos Sequelize que representan las tablas de la base de datos y sus relaciones. Aquí se encuentran las definiciones de los esquemas y las asociaciones entre tablas (relaciones One-to-Many, Many-to-Many).

- `/routes`  
  Define las rutas de la API REST. Cada archivo aquí expone endpoints para un recurso específico y conecta esas rutas con su controlador correspondiente.

- `/seeders`  
  Contiene los scripts para insertar datos iniciales o de prueba en la base de datos. Estos seeders permiten popular las tablas con información que facilite el desarrollo y las pruebas.

### Archivos raíz

- `index.js`  
  Archivo principal que arranca el servidor Express y conecta toda la configuración, rutas y middleware necesarios para la aplicación.

- `README.md`  
  Documento que describe el proyecto, cómo instalarlo, configurarlo y usarlo. Es la guía principal para cualquier persona que quiera entender o colaborar con el proyecto.

---

Esta estructura modular facilita la escalabilidad, el mantenimiento y la claridad del código, separando claramente responsabilidades y organizando el proyecto para un desarrollo eficiente.

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

```bash
npm install bcryptjs jsonwebtoken
```

- Ingresa tus datos de MySql en ***config.json*** para poder crear la db
```js
"development": {
        "username": "tu usuario",
        "password": "tu constraseña",
        "database": "nombre de la BBDD",
        "host": "localhost",
        "dialect": "mysql"
        "jwt_secret": "________"
    }
```

- Crea la db mediante terminal
```bash
sequelize db:create
  ``` 

- Realiza las migraciones de tablas
```bash
sequelize-cli db:migrate
```

- Usa los seeders para popular las tablas
```bash
sequelize db:seed:all
```

- Inicia el servidor
```bash
npm run dev
```

- Prueba con Postman los endpoints.
  
---

## Screenshots
![Endpoints con Postman](../Proyecto-Tienda-E-Commerce/assets/categories/endpoint_allCategoriesWithProduct.png)

![Endpoints con Postman](../Proyecto-Tienda-E-Commerce/assets/users/endpoint_loginUser.png)

  
## 👨‍💻 Autoras

-   ✍️ Maider 🐙 [@Maiderspb](https://www.github.com/Maiderspb)

-   ✍️ Paula  🐙 [@PaulaVegas](https://www.github.com/PaulaVegas)
