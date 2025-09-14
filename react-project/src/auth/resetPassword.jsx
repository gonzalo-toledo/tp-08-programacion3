import { useContext,useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

const ResetPassword = () => {

    const resetSchema = Yup.object({
        password: Yup.string().min(6,'Minimo 6 caracteres').required('La contraseña es requerida'),
        confirm: Yup.string().oneOf([Yup.ref('password')],'Las contraseñas no coinciden').required('Repetí la constraseña')
    })

    const {resetPassword} = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        token: '',
        id: ''   
    })

    useEffect(()=>{
        const url = new URLSearchParams(window.location.search)
        setParams({
            token: url.get('token') || "", id: url.get('id') || ""
        })
    },[])

    const invalidLink = !params.token || !params.id

    return (
        <Card title='Restablecer contraseña'>
            (invalidLink ? <h5>Enlace no valido</h5> :
            <Formik>
                
            </Formik>)  
        </Card>
    )
}

export default ResetPassword
