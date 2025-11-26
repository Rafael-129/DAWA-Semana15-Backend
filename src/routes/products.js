const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// Rutas públicas o para CUSTOMER/ADMIN (pueden ver productos)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (solo ADMIN puede crear/editar/eliminar)
router.post('/', authMiddleware, checkRole('ADMIN'), productController.createProduct);
router.put('/:id', authMiddleware, checkRole('ADMIN'), productController.updateProduct);
router.delete('/:id', authMiddleware, checkRole('ADMIN'), productController.deleteProduct);

module.exports = router;
