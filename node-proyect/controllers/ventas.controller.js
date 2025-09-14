const {Venta, Producto, Usuario} = require('../models');

const getAllSells = async (requestAnimationFrame, res) => {
    try { 
        const ventas = await Venta.findAll({
            /*inidco que atributos devolver para acortar la información*/
            attributes: ['id', 'cantidad', 'total', 'fecha'],
            
            /*lo mismo puedo hacer con Usuario y Producto*/
            include: [
                {
                    model:Usuario,
                    attributes: ['nombre', 'email']    
                },
                {
                    model:Producto,
                    attributes: ['nombre', 'precio']
                }
            ]
        });

        res.json({status: 200, data: ventas});
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al obtener las ventas", error: error})
    }
}

const getSaleByID = async (req, res) => {
    try {
        const sale = await Venta.findByPK(req.params.id, {
            include: [Usuario, Producto] /*incuimos las relaciones*/
        })

        if (!sale) {
            return res.status(404).json({status: 404, message: "Venta no encontrada"})
        }
        res.json({ status: 200, data: sale, message: "Venta obtenida exitosamente"})

    } catch (error) {
        res.status(500).json({status: 500, message: "Error al obtener la venta solicitada", error: error})
    }

}

const createSale = async (req, res) => {
    /*desestructuramos el req.body:*/
    const {usuarioId, productoId,cantidad, total, fecha} = req.body;

    try {
        if(!usuarioId || !productoId || !cantidad || !total || !fecha) {
            return res.status(400).json({status: 400, message: "Faltan datos obligatorios"})
        }

        const newSale = await Venta.create({usuarioId, productoId, cantidad, total, fecha});
        res.json({data: newSale, status: 201, message: "Venta creada exitosamente", data: newSale})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al crear la nueva venta", error: error})
    }
}

const updateSale = async (req, res) => {
    try {
        const sale = await Venta.findByPk(req.params.id);

        if(!sale) return res.json({status: 404, message: "Venta no encontrada"});

        const {usuarioId, productoId,cantidad, total, fecha} = req.body;

        sale.usuarioId = usuarioId || sale.usuarioId;
        sale.productoId = productoId || sale.productoId;
        sale.cantidad = cantidad || sale.cantidad;
        sale.total = total || sale.total;
        sale.fecha = fecha || sale.fecha;

        await sale.save();

        res.json({data: sale, status: 200, message: "Venta actualizada exitosamente"})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al actualizar la venta", error: error})
    }
}

const deleteSale = async (req, res) => {
    try {
        const sale = await Venta.findByPk(req.params.id);

        if(!sale) return res.json({status: 404, message: "Venta no encontrada"});

        await sale.destroy();

        res.json({data: sale, status: 200, message: "Venta eliminada exitosamente"})
    } catch (error) {
        res.status(500).json({status: 500, message: "Error al eliminar la venta", error: error})
    }
}



module.exports = {
    getAllSells,
    getSaleByID,
    createSale,
    updateSale,
    deleteSale
}