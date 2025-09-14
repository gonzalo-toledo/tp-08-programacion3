const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const crypto = require('crypto');
const { sendEmail } = require('../utils/mailer');

const register = async (req, res) => {

    const {nombre, email, edad, password, rol} = req.body

    try {
        const userExist = await Usuario.findOne({where: {email}})
        if(userExist) return res.status(400).json({message:'El usuario ya existe'})
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await Usuario.create(
            {
                nombre, 
                email, 
                edad, 
                password: hashedPassword,
                rol: rol || 'cliente' 
            })

        res.status(201).json({ message:'Usuario registrado exitosamente', data:newUser })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el usuario', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userExist = await Usuario.findOne({ where: { email } })
        if (!userExist) return res.status(400).json({ message: 'Usuario no encontrado' })

        const validPassword = await bcrypt.compare(password, userExist.password)
        if (!validPassword) return res.status(403).json({ message: 'Contraseña incorrecta' })

        const user = {
            id: userExist.id,
            nombre: userExist.nombre,
            email: userExist.email,
            edad: userExist.edad,
            rol: userExist.rol
        }

        const token = jwt.sign({ user: user }, 'secreto1234', { expiresIn: '1h' })


        res.json({ message: 'Inicio de sesion exitoso', token })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
    }
}

const resetTokens = new Map();

const resetEmailTemplate = ({nombre, resetUrl}) => {
    return `
    <div style="max-width: 520px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 4px; font-family: Arial, sans-serif;">
        <h2>Recupera tu contraseña</h2>
        <p>Hola ${nombre || ''}, recibimos tu solicitud para reestablecer la contraseña.</p>
        <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 4px;">Restablecer contraseña</a>
        </p>
        <p>Atentamente,</p>
        <p>El equipo de TechnoStore</p>
        <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p>
    </div>
    `
}

const forgotPassword = async(req, res) => {
    const {email} = req.body

        try {
            const user = await Usuario.findOne({where: {email}})
            if(!user) return res.status(400).json({message: 'Usuario no encontrado'})

            const rawToken = crypto.randomBytes(32).toString('hex') /*genera un token aleatorio*/
            const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex') /*hasheo de token*/
            const expiresAt = Date.now() + 15 * 60 * 1000 /*expira en 15 min*/
        
            resetTokens.set(user.id, {tokenHash, expiresAt}) 

            const resetUrl = `${process.env.FRONT_URL || 'http://localhost:5173'}/recuperar-contrasena?token=${rawToken}&id=${user.id}` 
            await sendEmail({
                to: user.email,
                subject: 'Recuperar contraseña',
                html: resetEmailTemplate({nombre: user.nombre, resetUrl})
            })
            


        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
        }
    }

const resetPassword = async(req, res) => {
    const {id, token, password} = req.body

    if(!id || !token || !password) return res.status(400).json({message: 'Faltan datos obligatorios'})
    
    try {
        const entry = resetTokens.get(Number(id))
        if(!entry) return res.status(400).json({message: 'Token no valido'})

        if(entry.expiresAt < Date.now()) return res.status(400).json({message: 'Token expirado'})

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        if(entry.tokenHash !== tokenHash) return res.status(400).json({message: 'Token no valido'})

        const user = await Usuario.findByPk(id)
        if(!user) return res.status(400).json({message: 'Usuario no encontrado'})
        
        user.password = await bcrypt.hash(password, 10)
        await user.save()

        resetTokens.delete(Number(id))

        res.status(201).json({message: 'Contraseña restablecida exitosamente'})

    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
    }

}


module.exports = {
    register,
    login,
    resetEmailTemplate,
    forgotPassword,
    resetPassword
}