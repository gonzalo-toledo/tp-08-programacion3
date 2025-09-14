const {Sequelize} = require('sequelize');

//conectar con la base de datos (nombre, usuario, contraseña)
const sequelize = new Sequelize('crud_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize