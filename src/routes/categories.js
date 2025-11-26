const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// Rutas públicas (pueden ver todos)
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Rutas protegidas (solo ADMIN)
router.post('/', authMiddleware, checkRole('ADMIN'), categoryController.createCategory);
router.put('/:id', authMiddleware, checkRole('ADMIN'), categoryController.updateCategory);
router.delete('/:id', authMiddleware, checkRole('ADMIN'), categoryController.deleteCategory);

module.exports = router;
