const  express = require('express');
const router = express.Router();
const { 
    getAllSells, getSaleByID, createSale, updateSale, deleteSale
} = require('../controllers/ventas.controller.js'); // importamos los controladores

//definir las rutas de la aplicación:
router.get('/', getAllSells);
router.get('/:id', getSaleByID);
router.post('/', createSale);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

module.exports = router