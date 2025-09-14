import React, { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";

export default function MenuBar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const items = user ? [
        {
            label: 'Productos',
            items: [
                // Solo admin ve "Crear producto"
                ...(user.rol === 'admin' ? [
                    { label: 'Crear producto', command: () => navigate('/productos/crear') }
                ] : []),
                { label: 'Lista de productos', command: () => navigate('/productos') }
            ]
        },
        ...(user).rol === 'admin' ? [
            {
                label: 'Usuarios',
                items: [
                    // Solo admin ve crear usuario
                    ...(user.rol === 'admin' ? [
                        { label: 'Crear usuario', command: () => navigate('/usuarios/crear') }
                    ] : []),
                    { label: 'Lista de usuarios', command: () => navigate('/usuarios') }
                ]
            },
        ] : [],
    ] : [];

    const start = (
        <div className="flex align-items-center gap-2">
            <a href="/">
                <span className="logo font-bold text-2xl">TechnoStore</span>        
            </a>
        </div>
    );

    const end = user ? (
        <div className="flex align-items-center gap-3">
            <span className="rol-menu text-sm font-semibold text-gray-600">
                {user.rol === "admin" ? "(Modo Admin)" : ""}
            </span>
            
            <Button 
                label="Cerrar sesión" 
                icon="pi pi-sign-out" 
                className="p-button-danger p-button-sm"
                onClick={logout} 
            />
        </div>
        ) : (
        <div className="flex gap-2">
            <Button 
                label="Iniciar sesión" 
                icon="pi pi-sign-in" 
                className="p-button-outlined p-button-sm"
                onClick={() => navigate('/inicio-sesion')} 
            />
            <Button 
                label="Registrarse" 
                icon="pi pi-user-plus" 
                className="p-button-success p-button-sm"
                onClick={() => navigate('/registro')} 
            />
        </div>
        
    );

    return (
        <div>
            <Menubar model={items} start={start} end={end} className="custom-menubar" /> 
        </div>
    );
}
