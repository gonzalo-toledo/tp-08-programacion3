import React, { Fragment } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Button } from "primereact/button";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const ProductForm = () => {
    const { createProduct, editProduct, editingProduct, setEditingProduct } = React.useContext(ProductContext);
    const navigate = useNavigate();

    //primero definir initialValues 
    const initialValues = {
        nombre: editingProduct?.nombre || '', // el ? es para que no rompa si editingProduct es null. El || es para que si es null, ponga un string vacio
        caracteristicas: editingProduct?.caracteristicas || '',
        precio: editingProduct?.precio || '',
    }

    // definir el esquema de validacion
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(15, 'El nombre es muy largo') 
            .required('El nombre es requerido'),
        caracteristicas: Yup.string(),
        precio: Yup.number()
            .required('La precio es requerido'),
    });
    
const handleSubmit = async (values) => { 
    try { 
        if (editingProduct) { 
            await editProduct(values); 
            Swal.fire({ 
                icon: 'success', 
                title: '¡Producto editado!', 
                text: 'El producto fue editado correctamente', 
            }); 
            setEditingProduct(null); // Resetear el producto en edición 
        } else { 
            await createProduct(values); 
            Swal.fire({ 
                icon: 'success', 
                title: '¡Producto creado!', 
                text: 'El producto fue creado correctamente', 
            }); 
        } navigate('/productos'); // Redirigir a la lista de productos después de crear o editar 
    } catch (error) { 
        console.error("Error al crear o editar el producto:", error); 
        Swal.fire({ 
            icon: 'error', 
            title: '¡Error!', 
            text: 'Hubo un problema al crear o editar el producto', 
        }); 
    }
};


    return (
        <Fragment>
            <div className="container mt-4">
                <h1 className="mb-4">{editingProduct ? 'Editar producto' : 'Crear un nuevo producto' }
                </h1>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                /* a onSubmit se le pasa la funcion para crear el producto */
                onSubmit={handleSubmit}
                /* enableReinitialize permite que el formulario se actualice cuando cambian los valores iniciales */
                enableReinitialize 

                >
                    <Form className="form-container"> 
                        <div className="form-group" >
                            <label htmlFor="nombre" >Nombre</label>
                            <Field name="nombre" type="text" id="nombre"/>
                            <ErrorMessage className="error-message"  name="nombre" component="div" />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="precio">precio</label>
                            <Field name="precio" type="number" id="precio"/>
                            <ErrorMessage className="error-message"  name="precio" component='div' />
                        </div>

                        {/* Boton de envio al ser tipo submit va usar la funcion onSubmit*/}
                        <Button 
                            label={editingProduct ? "Guardar cambios" : "Crear producto"} 
                            type="submit"
                        >
                        </Button>  

                    </Form>

                </Formik>

            </div>
            
        </Fragment>
    );
};

export default ProductForm;