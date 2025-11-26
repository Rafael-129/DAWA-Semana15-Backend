const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isIn: [['ADMIN', 'CUSTOMER']]
    }
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'roles',
  timestamps: true
});

module.exports = Role;
