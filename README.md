Proyecto Fullstack MERN-like moderno, inspirado en Netflix, construido con tecnologías de producción y estructura MVC limpia.
Permite registro/login de usuarios, gestión de perfiles, listado de películas y series, y sistema de favoritos, todo respaldado por una base de datos relacional robusta.

Stack Tecnológico
---Frontend---

React + Vite → SPA moderna, rápida y optimizada.

React Router DOM → Navegación entre vistas (Home, Login, Signup, Detail).

Context API → Gestión global de autenticación y favoritos.

Axios → Cliente HTTP para consumir la API REST.

Vite env → Variables de entorno y configuración flexible.

(Opcional) TailwindCSS → Estilos limpios y responsive.

---Backend---

Node.js + Express → Servidor REST con arquitectura MVC.

Prisma ORM → Capa de acceso a datos tipada y segura.

bcryptjs → Hash de contraseñas para autenticación segura.

jsonwebtoken (JWT) → Sistema de login con tokens.

CORS + dotenv + morgan → Seguridad, configuración y logs.

---Base de Datos---

PostgreSQL → Base de datos relacional con esquema complejo (usuarios, perfiles, medios, géneros, favoritos, historial, valoraciones...).

Prisma Migrate → Control de versiones del esquema y migraciones automáticas.

---Infraestructura / DevOps---

Docker Compose → Orquesta todos los servicios (frontend, backend, base de datos).

Nginx → Servidor reverse proxy para el build del frontend (producción).

Node:20 + Alpine → Imágenes ligeras y optimizadas para el backend y frontend.

.env management → Configuración segura de credenciales (DB, JWT, etc.).

---Entorno de Desarrollo---

Ubuntu (VirtualBox) → Entorno Linux limpio para desarrollo y despliegue.

Visual Studio Code → Editor principal conectado con GitHub.

Git + GitHub → Control de versiones y despliegue continuo.
