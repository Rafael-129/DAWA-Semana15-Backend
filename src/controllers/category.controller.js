const { Category } = require('../models');

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ 
      error: 'Error al obtener categorías',
      details: error.message 
    });
  }
};

// Obtener categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ 
      error: 'Error al obtener categoría',
      details: error.message 
    });
  }
};

// Crear nueva categoría (solo ADMIN)
exports.createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const category = await Category.create({ nombre, descripcion });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ 
      error: 'Error al crear categoría',
      details: error.message 
    });
  }
};

// Actualizar categoría (solo ADMIN)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await category.update({ nombre, descripcion });
    res.json(category);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ 
      error: 'Error al actualizar categoría',
      details: error.message 
    });
  }
};

// Eliminar categoría (solo ADMIN)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await category.destroy();
    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ 
      error: 'Error al eliminar categoría',
      details: error.message 
    });
  }
};
