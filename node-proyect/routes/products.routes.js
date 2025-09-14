const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controller'); // importamos los controladores

const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')


//definir las rutas de la aplicación:
router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken, getProductById);
router.post('/',verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router