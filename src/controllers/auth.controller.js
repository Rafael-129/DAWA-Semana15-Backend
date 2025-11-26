const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

// Generar JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'secret_key_default',
    { expiresIn: '7d' }
  );
};

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, roleId } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !password) {
      return res.status(400).json({ 
        error: 'Nombre, email y contraseña son requeridos.' 
      });
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'El email ya está registrado.' 
      });
    }

    // Crear usuario (por defecto roleId = 2 CUSTOMER)
    const user = await User.create({
      nombre,
      email,
      password,
      roleId: roleId || 2
    });

    // Obtener usuario con rol
    const userWithRole = await User.findByPk(user.id, {
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'nombre']
      }],
      attributes: { exclude: ['password'] }
    });

    // Generar token
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: userWithRole
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ 
      error: 'Error al registrar usuario',
      details: error.message 
    });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos.' 
      });
    }

    // Buscar usuario por email (incluir password para verificar)
    const user = await User.findOne({ 
      where: { email },
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'nombre']
      }]
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas.' 
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas.' 
      });
    }

    // Generar token
    const token = generateToken(user.id);

    // Remover password de la respuesta
    const userResponse = user.toJSON();

    res.json({
      message: 'Login exitoso',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: 'Error al iniciar sesión',
      details: error.message 
    });
  }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ 
      error: 'Error al obtener perfil' 
    });
  }
};
