const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/users', userController.createUser);
router.post('/login', userController.authenticateUser);
router.post('/check-email', userController.checkEmailExists);
//-----------------------------------------------------------------

router.get('/products', userController.getAllProducts);
router.get('/products/:id', userController.getProductById);
router.post('/products', userController.createProduct);
router.put('/products/:id', userController.updateProduct);
router.delete('/products/:id', userController.deleteProduct);
router.patch('/products/:id/toggle', userController.toggleProductStatus);

module.exports = router;
