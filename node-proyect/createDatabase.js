const mysql = require('mysql2/promise'); // importamos mysql/

const crearBaseDeDatos = async () => {
    try {
        const connection = await mysql.createConnection({ // creamos la conexion a la base de datos
            host: 'localhost',
            user: 'root',
            password: 'root'
        })
        
        await connection.query('CREATE DATABASE IF NOT EXISTS crud_db') // creamos la base de datos si no existe
        console.log('La base de datos ya existe');
    
        await connection.end();
    } catch (error) {
        console.error('Hubo un error en la base de datos:', error.message); 
    }
        
}

crearBaseDeDatos();