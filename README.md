Netflix Clone – Full Stack Web App (React + Node.js + PostgreSQL + Prisma)

Aplicación Full Stack inspirada en Netflix, desarrollada con arquitectura MVC, autenticación con JWT, gestión de perfiles y catálogo multimedia. El proyecto simula un entorno real de producción, con contenedores Docker, servidor Nginx y base de datos relacional.

Incluye login/registro, sistema de favoritos, filtrado por género, detalle de contenido y panel de administración básico.

---

Funcionalidades principales

Registro e inicio de sesión con JWT  
Gestión de favoritos por usuario  
Perfiles independientes  
Catálogo de películas/series (listado, detalle, búsqueda y filtros por género)  
Validaciones  
Arquitectura MVC  
Base de datos relacional optimizada  
Docker Compose para entorno completo  

---

Tecnologías utilizadas

Frontend
- React + Vite
- React Router DOM
- Context API (auth & favoritos)
- Axios
- Variables de entorno (.env)

Backend
- Node.js + Express
- Arquitectura MVC
- Prisma ORM
- JWT (auth)
- bcryptjs
- CORS, dotenv, morgan

Base de datos
- PostgreSQL
- Prisma migrate (control de esquema)

Infraestructura
- Docker Compose (frontend + backend + db)
- Nginx como reverse proxy
- Imágenes Alpine
- Variables de entorno separadas

---


- MVC en backend  
- Separación entre lógica, rutas, controladores y capa de datos
- Servicios reutilizables
- Middlewares de autenticación (JWT)

---

Autenticación y seguridad

- Hash de contraseñas con bcrypt
- JWT Access Tokens
- Middleware de validación
- Rutas protegidas
- Gestión de sesión en frontend con Context API

---

Base de datos

Modelo relacional con tablas como:
- usuarios
- perfiles
- contenido multimedia
- géneros
- favoritos
- historial

Migraciones gestionadas con Prisma Migrate

---

Endpoints principales

Auth
- POST /auth/register
- POST /auth/login

Media
- GET /media
- GET /media/:id
- POST /media (admin)
- PUT /media/:id (admin)
- DELETE /media/:id (admin)

Favorites
- GET /favorites
- POST /favorites/:id
- DELETE /favorites/:id

---

Capturas
- Inicio
  <img width="1852" height="849" alt="image" src="https://github.com/user-attachments/assets/0ec80ab0-67bf-434f-b934-237829d46400" />
- Registro
  <img width="1859" height="894" alt="image" src="https://github.com/user-attachments/assets/a4ab8919-0b2a-4ad7-ac54-6cb6be137096" />
- Login
  <img width="1852" height="888" alt="image" src="https://github.com/user-attachments/assets/88619b53-a582-4374-9f53-fb0f1905ddad" />
-Error 404 custom
  <img width="1854" height="891" alt="image" src="https://github.com/user-attachments/assets/70ce4c71-84d1-4b22-b022-3afbb54b94d0" />
-Start de la pagina
  <img width="1856" height="893" alt="image" src="https://github.com/user-attachments/assets/c5d43d7a-537d-4a99-9a91-eb74d31ffdd8" />
- Listado de películas
  <img width="1855" height="892" alt="image" src="https://github.com/user-attachments/assets/98605623-3eb8-4c15-b202-11e0f9f3afb9" />
- Listado de series
  <img width="1856" height="898" alt="image" src="https://github.com/user-attachments/assets/351708be-c46d-4e84-8e2f-e8b9b471d507" />
- Detalle de contenido
  <img width="1853" height="890" alt="image" src="https://github.com/user-attachments/assets/9cb9cf29-0e50-477c-97af-63a10ebae539" />
  <img width="1855" height="889" alt="image" src="https://github.com/user-attachments/assets/5c159bea-8c8e-4047-98b2-e0696ec0b35e" />
- Gestión de favoritos
  <img width="1854" height="890" alt="image" src="https://github.com/user-attachments/assets/6c2bce03-10dd-4119-868c-db655202f72f" />

---

Instalación local

Requisitos:
- Docker y Docker Compose
- git clone https://github.com/IzanFerGi/Netflix-con-react-y-node
- cd Netflix-con-react-y-node
- docker compose up --build


Frontend: http://localhost:80  
Backend: http://localhost:3000  
DB: localhost:5432


---

Desarrollador
**Izan Ferrer Gimeno**

- Full Stack Web Developer (DAW)
- React · Node.js · SQL · MVC · Docker
- Github: https://github.com/IzanFerGi

---



