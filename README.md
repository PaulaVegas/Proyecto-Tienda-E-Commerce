# 🛒 Proyecto E-Commerce API

Backend de una tienda online con autenticación, relaciones entre tablas y gestión de datos con Sequelize + MySQL.

## 📌 Introducción

En el proyecto de backend se combinan los conocimientos adquiridos en Node.js y Express, junto con MySQL y Sequelize para la gestión de bases de datos relacionales.

El objetivo es desarrollar una API REST para una tienda online (e-commerce), donde se gestionen usuarios, productos, categorías y pedidos, incluyendo la implementación de autenticación y relaciones entre tablas.

-   🐢 **Node.js + Express**
-   🐬 **MySQL** gestionado con **Sequelize**

Además, el alumno deberá presentar y defender un diagrama **diagrama relacional** que explique las relaciones entre las tablas del proyecto.

## 🧩 Descripción del proyecto

Una vez analizadas las necesidades del proyecto, se espera que el alumno desarrolle una API REST que sea capaz de lo siguiente:

-   🔐 Registro de usuarios usando Bcrypt.
-   🛡️ Login de usuarios + token + middleware.
-   🧠 Que sea capaz de crear un CRUD.
-   🔗 Al menos una relación Many to Many y otra One to Many.
-   🌱 Utilización de seeders

## 💥 Requisitos imprescindibles del proyecto:

-   Uso de _ramas_ con git, cuando se termine el proyecto deberán quedar dos ramas la `master o main` y la `develop`.
-   Presentación de README **excelente**.

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

## 📂 Estructura del Proyecto

/config
/controllers
/models
/routes
/seeders
index.js
README.md

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

-   Inicia el servidor

```bash
npm run dev
```

## 👨‍💻 Autoras

-   ✍️ Maider
-   🐙 [@Maiderspb](https://www.github.com/Maiderspb)

-   ✍️ Paula
-   🐙 [@PaulaVegas](https://www.github.com/PaulaVegas)
