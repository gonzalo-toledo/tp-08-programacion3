import React from 'react';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <div className="footer-section">
                    <h4>TechnoStore</h4>
                    <p>Tu tienda de confianza en smartphones y tecnología.</p>
                    <p>Buenos Aires, Argentina</p>
                    <p>Email: contacto@technostore.com</p>
                    <p>Tel: +54 11 1234-5678</p>
                </div>

                <div className="footer-section">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/productos">Productos</a></li>
                        <li><a href="/usuarios">Usuarios</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Seguinos</h4>
                    <p className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                    </p>
                </div>
            </div>

            <div className="footer-legal">
                <p>© 2025 TechnoStore. Todos los derechos reservados.</p>
                <p>
                    <a href="/terminos">Términos y condiciones</a> | 
                    <a href="/privacidad">Política de privacidad</a>
                </p>
            </div>
        </footer>
    );
}
