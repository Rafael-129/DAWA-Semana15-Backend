const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

// Middleware para verificar token JWT
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Acceso denegado. Token no proporcionado.' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_default');
    
    // Buscar usuario
    const user = await User.findByPk(decoded.id, {
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'nombre']
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado.' });
    }

    // Agregar usuario a la request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' });
    }
    res.status(500).json({ error: 'Error en la autenticación.' });
  }
};

// Middleware para verificar rol
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado.' });
    }

    const userRole = req.user.role?.nombre;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: 'Acceso denegado. No tienes permisos suficientes.' 
      });
    }

    next();
  };
};

module.exports = {
  authMiddleware,
  checkRole
};
