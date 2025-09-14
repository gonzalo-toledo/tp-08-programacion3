import React, { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "primereact/button";

import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import confettji from 'canvas-confetti';

const UserForm = () => {
    const { createUser, editUser, editingUser, setEditingUser, users } = React.useContext(UserContext);
    const navigate = useNavigate();

    // Valores iniciales del formulario
    const initialValues = {
        nombre: editingUser?.nombre || '',
        edad: editingUser?.edad || '',
        email: editingUser?.email || '',
        rol: editingUser?.rol || 'cliente',
    };

    // Esquema de validación
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(15, 'El nombre es muy largo')
            .required('El nombre es requerido'),
        edad: Yup.number()
            .typeError('La edad debe ser un número')
            .min(18, 'Debes ser mayor de edad para registrarte')
            .required('La edad es requerida'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es requerido')
            .test('email-exists', 'Este correo ya está registrado', function (value) {
                if (!value) return true;
                const editingUserId = editingUser?.id;
                const emailExists = users.some(
                    user => user.email === value && user.id !== editingUserId
                );
                return !emailExists;
            })
    });

    const handleSubmit = async (values) => {
        const formattedValues = { ...values, edad: Number(values.edad) };

        if (editingUser) {
            const success = await editUser(formattedValues);
            if (success) {
                // Actualiza editingUser con los valores modificados
                setEditingUser({ ...editingUser, ...formattedValues });

                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario editado!',
                    text: 'El usuario fue editado correctamente',
                });
                navigate('/usuarios');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo editar el usuario. ¿Tenés permisos?',
                });
            }
        } else {
            const success = await createUser(formattedValues);
            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario creado!',
                    text: 'El usuario fue creado correctamente',
                });
                handleConfetti();
                navigate('/usuarios');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo crear el usuario. ¿Tenés permisos?',
                });
            }
        }
    };

    // Efecto de confetti
    const handleConfetti = () => {
        confettji({
            particleCount: 500,
            startVelocity: 40,
            spread: 360,
        });
    };

    return (
        <Fragment>
            <div className="container mt-4">
                <h1 className="mb-4">{editingUser ? 'Editar usuario' : 'Crear un nuevo usuario'}</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <Form className="form-container">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <Field name="nombre" type="text" id="nombre" />
                            <ErrorMessage className="error-message" name="nombre" component="div" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edad">Edad</label>
                            <Field name="edad" type="number" id="edad" />
                            <ErrorMessage className="error-message" name="edad" component="div" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <Field name="email" type="text" id="email" />
                            <ErrorMessage className="error-message" name="email" component="div" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rol">Rol</label>
                            <Field name="rol" as="select" id="rol">
                                <option value="cliente">Cliente</option>
                                <option value="admin">Administrador</option>
                            </Field>
                            <ErrorMessage className="error-message" name="rol" component="div" />
                        </div>

                        <Button
                            label={editingUser ? "Guardar cambios" : "Crear usuario"}
                            type="submit"
                            className="p-button-primary"
                        />
                    </Form>
                </Formik>
            </div>
        </Fragment>
    );
};

export default UserForm;
