const express = require('express');
const router = express.Router();
const { 
    register,
    login,
    forgotPassword,
    resetPassword
} = require('../controllers/auth.controller.js'); // importamos los controladores

//definir las rutas de la aplicación:
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router