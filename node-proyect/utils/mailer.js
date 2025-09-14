const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ /*es un transportador para usar las funcionalidades de nodemailer*/
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    } 
});

const sendEmail = async ({to, subject, html}) => {
    console.log(process.env.SMTP_HOST);
    
    return transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html
    });
}

module.exports = {
    sendEmail
}