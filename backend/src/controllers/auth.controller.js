// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '7d';

// Regex de validación de contraseña: al menos 5 caracteres y una mayúscula
const PASSWORD_REGEX = /^(?=.*[A-Z]).{5,}$/;

// Función helper para normalizar emails
function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

// Registro de usuario
// Registro de usuario
async function signup(req, res) {
  try {
    let { email, password, name } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email y contraseña requeridos' });

    email = email.toLowerCase().trim();

    // Verificar si ya existe el usuario (email en minúsculas)
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser)
      return res.status(409).json({ error: 'Este email ya está registrado' });

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
      message: 'Usuario creado correctamente, ahora inicia sesión.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Login de usuario
async function login(req, res) {
  try {
    const rawEmail = req.body.email;
    const email = normalizeEmail(rawEmail);
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // No decir "email no existe" para evitar enumeración de usuarios
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { signup, login };
