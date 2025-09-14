import React, { Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { exportToPdf } from "../utils/ExportToPdf";



const UsersView = () => {
    const {users, loading,setEditingUser, deleteUser} = React.useContext(UserContext);
    const navigate = useNavigate();
    
    const handleEdit = (user) => {
        setEditingUser(user);
        navigate(`/usuarios/editar/${user.id}`);
    };

const handleDelete = async (id) => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        const success = await deleteUser(id);
        
        if (success) {
            Swal.fire(
                '¡Eliminado!',
                'El usuario fue eliminado exitosamente.',
                'success'
            );
            //refrescar la ruta como solución temporaria 
            window.location.reload();
        } else {
            Swal.fire(
                'Error',
                'Hubo un problema al eliminar el usuario.',
                'error'
            );
        }
    }
};


    const bodyActions = (rowData) => {
        return (
            <div className="p-d-flex p-gap-2">
                <Button     
                    label="Editar"
                    onClick={() => handleEdit(rowData)}
                    

                />
                <Button 
                    label="Eliminar"
                    onClick={() => {
                        handleDelete(rowData.id);
                    }}
                />
            </div>
        );
    };

    //Efecto de sonido
    const handlePlaysoundCock = () => {
        const audio = new Audio('/pistol-gun-cock-89523.mp3');
        audio.play();
    }
    const handlePlaysoundDelete = () => {
        setTimeout(() => {
            const audio = new Audio('/pistol-shot-233473.mp3');
            audio.play();
        }, 100);
    }



    return (
        <Fragment>
            <h1>Listado de usuarios</h1>
            {/* Tabla de datos */}
            <DataTable 
                // header="Usuarios" 
                value={users} 
                paginator 
                rows={10} 
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="custom-datatable"
                emptyMessage="No se encontraron usuarios"
            >
                <Column field="nombre" header="Nombre" sortable /> 
                <Column field="edad" header="Edad" sortable />
                <Column field="email" header="Correo Electrónico" sortable />
                <Column 
                    body={bodyActions} 
                    header="Acciones"
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                />
            </DataTable>
            <div>
                <Button
                    label="PDF"
                    icon="pi pi-file-pdf"
                    onClick={() => {
                        const columns = ["nombre", "edad", "email"];
                        exportToPdf(users, "Listado de usuarios", columns);
                    }}                
                />
            </div>
        </Fragment>
    );
};

export default UsersView;