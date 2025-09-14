import UsersView from "./UsersView";
import UserForm from "./UserForm";
import {Routes, Route } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";



const UsersModule = () => {
    return (

            <Routes>
                <Route 
                    path="/usuarios" 
                    element={
                        <PrivateRoute>
                            <UsersView/>
                        </PrivateRoute>
                        } 
                    />
                <Route
                    path="/usuarios/crear"
                    element={
                        <PrivateRoute>
                            <UserForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/usuarios/editar/:id"
                    element={
                        <PrivateRoute>
                            <UserForm />
                        </PrivateRoute>
                    }
                />
            </Routes>

        
    )
}

export default UsersModule;