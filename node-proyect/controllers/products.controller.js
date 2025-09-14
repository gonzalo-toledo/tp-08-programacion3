const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/products.json');

const {Producto} = require('../models'); // importamos el modelo. desempaquetamos la propiedad Producto 


// const readProducts = () => {
//     const data = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(data);
// }

// const writeProducts = (products) => {
//     fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

// }

const getAllProducts = async (req, res) => {
    try {
        const products = await Producto.findAll(); //findAll es un metodo de sequelize que devuelve todos los productos
        res.json({data: products, status: 200, message: "productos obtenidos exitosamente"})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al obtener los productos"}) 
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Producto.findByPk(req.params.id);
        if(!product) return res.json ({status: 404, message:"producto no encontrado"});

        res.json({data: product, status: 200, message: "producto obtenido exitosamente"})
    }catch (error) {
        res.status(500).json({status: 500, message:'Error interno', error: error.message})
    }
}

const createProduct = async (req, res) => {
    /* desestructuramos el body */
    const {nombre, precio} = req.body;
    
    try {
        if (!nombre || !precio) {
            return res.status(400).json({status: 400, message: "Faltan datos obligatorios"})};

        const product = await Producto.create({nombre, precio});
        res.json({data: product, status: 201, message: "producto creado exitosamente", data: product})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al crear el producto"})
        
    }
}

const updateProduct = async(req, res) => {
    const {nombre, precio} = req.body;
    try {
        if (!nombre || !precio) {
            return res.status(400).json({status: 400, message: "Faltan datos obligatorios"})};
            
        const product = await Producto.findByPk(req.params.id);
        if(!product) return res.json ({status: 404, message:"producto no encontrado"});
        product.nombre = nombre || product.nombre;
        product.precio = precio || product.precio;
        await product.save();
        res.json({data: product, status: 200, message: "producto actualizado exitosamente"})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al actualizar el producto"})
    }
}

// const updateProduct = (req, res) => {
//     let products = readProducts();
//     const product = products.find(item => item.id === parseInt(req.params.id));
//     if (!product) return res.json ({status: 404, message:"producto no encontrado"});
//     const {nombre, caracteristicas, precio} = req.body;
//     product.nombre = nombre || product.nombre;
//     product.caracteristicas = caracteristicas || product.caracteristicas;
//     product.precio = precio || product.precio;
//     writeProducts(products)

//     res.json({data: product, status: 200, message: "producto actualizado exitosamente"})
// }

const deleteProduct = async (req, res) => {
    try {
        const product = await Producto.findByPk(req.params.id);
        if(!product) return res.json ({status: 404, message:"producto no encontrado"});
        await product.destroy();
        res.json({data: product, status: 200, message: "producto eliminado exitosamente"})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al eliminar el producto"})
    }
}
// const deleteProduct = (req, res) => {
//     let products = readProducts();
//     const product = products.find(item => item.id === parseInt(req.params.id));
//     if (!product) return res.json ({status: 404, message:"producto no encontrado"});
//     products = products.filter(item => item.id !== parseInt(req.params.id)); 
//     writeProducts(products)

//     res.json({data: product, status: 200, message: "producto eliminado exitosamente"})
// }

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
