const sequelize = require('../config/database');
const User = require('./User');
const Role = require('./Role');
const Product = require('./Product');
const Category = require('./Category');

// Definir relaciones
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Función para sincronizar modelos con la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✓ Base de datos sincronizada correctamente');
    
    // Crear roles por defecto si no existen
    const rolesCount = await Role.count();
    if (rolesCount === 0) {
      await Role.bulkCreate([
        { nombre: 'ADMIN', descripcion: 'Administrador del sistema' },
        { nombre: 'CUSTOMER', descripcion: 'Cliente de la plataforma' }
      ]);
      console.log('✓ Roles creados correctamente');
    }
  } catch (error) {
    console.error('Error al sincronizar base de datos:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Role,
  Product,
  Category,
  syncDatabase
};
