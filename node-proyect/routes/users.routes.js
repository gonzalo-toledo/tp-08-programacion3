const express = require('express');
const router = express.Router();

const { 
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/user.controller.js'); // importamos los controladores

const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

//definir las rutas de la aplicación:
router.get('/', verifyToken, isAdmin, getUsuarios);
router.get('/:id', verifyToken, isAdmin, getUsuarioById);
router.post('/', verifyToken, isAdmin, createUsuario);
router.put('/:id', verifyToken, isAdmin, updateUsuario);
router.delete('/:id', verifyToken, isAdmin, deleteUsuario);


module.exports = router