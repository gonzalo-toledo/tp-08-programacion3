import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

// import { Password } from "primereact/password";

const ForgotPassword = () => {
    const { forgotPassword } = useContext(AuthContext);
    const {loading, setLoading} = useState(false);

    const ForgotSchema = Yup.object({
        email: Yup.string().email("Email invalido").required("Campo requerido"),
    });
    return(
        <Card title="Recuperar contraseña">
            <h3>Recuperar contraseña</h3>
            <p>Ingresa tu email para recuperar tu contraseña</p>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email("Email invalido").required("Campo requerido"),
                })}
                onSubmit={async (values) => {
                    setLoading(true);
                    const response = await forgotPassword(values.email);
                    if (response) resetForm();
                    setLoading(false);
                }}
            >
                    <Form>
                        <label>Email</label>
                        <Field name="email" >
                        {({field}) =>(
                            <InputText id='email' {...field} placeholder="ejemplo@gmail.com"/>
                        )}
                        </Field>
                        <ErrorMessage name="email" />

                        <Button
                            type="submit"
                            label="Recuperar contraseña"
                            icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                        />
                    </Form>
            </Formik>
        </Card>
    )
}


export default ForgotPassword