import React, { Fragment, useContext } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";   // 👈 importar AuthContext
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { exportToPdf } from "../utils/ExportToPdf";

const ProductsView = () => {
    const { products, loading, setEditingProduct, deleteProduct } = useContext(ProductContext);
    const { user } = useContext(AuthContext);   // 👈 obtener user
    const navigate = useNavigate();
    
    const handleEdit = (product) => {
        setEditingProduct(product);
        navigate(`/productos/editar/${product.id}`);
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
            const success = await deleteProduct(id);
            
            if (success) {
                Swal.fire(
                    '¡Eliminado!',
                    'El producto fue eliminado exitosamente.',
                    'success'
                );

                
            } else {
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el producto.',
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
                    severity="danger"
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    };

    return (
        <Fragment>
            <h1>Listado de productos</h1>
            {/* Tabla de datos */}
            <DataTable 
                value={products} 
                paginator 
                rows={10} 
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="custom-datatable"
                emptyMessage="No se encontraron productos"
            >
                <Column field="nombre" header="Nombre" sortable/> 
                <Column field="precio" header="Precio" sortable  />
                
                {/* 👇 Solo mostrar acciones si user es admin */}
                {user?.rol === "admin" && (
                    <Column 
                        body={bodyActions} 
                        header="Acciones"
                        exportable={false}
                        style={{ minWidth: '8rem' }}
                    />
                )}
            </DataTable>

            <div>
                <Button
                    label="PDF"
                    icon="pi pi-file-pdf"
                    onClick={() => {
                        const columns = ["nombre", "precio"];
                        exportToPdf(products, "Listado de productos", columns);
                    }}                
                />
            </div>
        </Fragment>
    );
};

export default ProductsView;
