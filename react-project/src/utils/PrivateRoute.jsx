import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    return user ? children : <Navigate to='/inicio-sesion'/> /*si existe el usuario hace lo que dice children (si no redirige a la pagina de login)*/
}

export default PrivateRoute