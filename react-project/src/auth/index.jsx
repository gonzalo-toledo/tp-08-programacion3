import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import PublicRoute from "../utils/PublicRoute";

import { Routes, Route } from "react-router-dom";

const AuthModule = () => {
    return (
        <Routes>
            <Route 
                path="/inicio-sesion" 
                element={
                    <PublicRoute>
                        <LoginForm />   
                    </PublicRoute>
                } 
            />
            <Route
                path="/registro"
                element={
                    <PublicRoute>
                        <RegisterForm />
                    </PublicRoute>
                }
            />
        </Routes>
    );
};

export default AuthModule;