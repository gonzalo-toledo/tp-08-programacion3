const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    const [scheme,token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) { /*valido si el token es bearer y no esta vacio*/
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secreto1234'); /*la clave secreta la asigno en auth.controller.js*/
        req.user = decodedToken;
        next(); /*si puedo decodificar el token, paso al siguiente middleware*/
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido o expirado' });
    }
}

module.exports = verifyToken 