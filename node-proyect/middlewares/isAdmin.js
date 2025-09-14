const isAdmin = (req, res, next) => {
        if (req.user.user.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }
        next();
    };

module.exports = isAdmin