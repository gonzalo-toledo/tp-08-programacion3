import { createContext, useState, useEffect } from "react";
import axios from "axios";

//creacion del context:
export const UserContext = createContext() // al context lo voy a importar en usersContainer.jsx


// el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// al provider lo voy a importar en App.jsx
//children es lo que se va a renderizar dentro del provider, es una palabra reservada
export const UserProvider = ({ children }) => {
    const[users, setUsers]= useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_URL = 'http://localhost:3000/usuarios';

    const getUsers = async () => {   
        try {
            setLoading(true);
            const response = await axios.get(API_URL,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data.data);
            //console.log("response getUsers", response.data.data); //axios me devuelve los datos en .data
        }catch (error) {
            setError(error.message);
            console.error("axios GET error:", error);
        } finally {
            setLoading(false);
        }   
    }
    
    useEffect(() => {
        getUsers()
    }
    , [])
    
    //crear un usuario
    const createUser = async (value) => {
        try {
            setLoading(true);
            const response = await axios.post(API_URL, value,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("response createUser", response.data);
            await getUsers(); // Actualiza la lista de usuarios después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios POST error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // editar un usuario
    const editUser = async (values) => {
        if(!editingUser) return; // Si no hay un usuario en edición, no hacemos nada
        try {
            setLoading(true);
            await axios.put(`${API_URL}/${editingUser.id}`, values,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            setEditingUser(null); // Resetear el usuario en edición
            await getUsers(); // Actualiza la lista de usuarios después de editar uno
            return true;
        } catch (error) { 
            setError(error.message);
            console.error("Axios PUT error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    // eliminar un usuario
    const deleteUser = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("response deleteUser", id);
            await getUsers(); // Actualiza la lista de usuarios luego de eliminar uno
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Axios DELETE error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return (
        <UserContext.Provider 
            value={{
                users, 
                getUsers, 
                createUser, 
                loading, 
                setLoading, 
                editUser, 
                error, 
                setError, 
                editingUser, 
                setEditingUser, 
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}