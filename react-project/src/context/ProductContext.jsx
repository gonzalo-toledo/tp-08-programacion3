import { createContext, useState, useEffect } from "react";
// import axios from "axios"; // Ya no usamos axios directo, usamos la instancia api con interceptor
import api from "../services/api"; // instancia de axios con baseURL y token automático

// Creación del context (lo voy a importar en ProductsContainer.jsx)
export const ProductContext = createContext();

// El provider es el que va a envolver a los componentes que van a usar el context (toda la funcionalidad).
// Al provider lo voy a importar en App.jsx.
// children es lo que se va a renderizar dentro del provider, es una palabra reservada de React.
export const ProducProvider = ({ children }) => {
    const [products, setProducts] = useState([]); 
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Ya no repetimos http://localhost:3000 porque en api.js ya configuramos la baseURL.
    const API_URL = '/productos';

    // Obtener todos los productos
    const getProducts = async () => {   
        try {
            setLoading(true);
            // Usamos api.get en lugar de axios.get; api ya envía el token automáticamente si existe
            const response = await api.get(API_URL);
            setProducts(response.data.data);
            console.log("response getProducts", response.data.data); // axios devuelve los datos en .data
        } catch (error) {
            // Mejor manejar el mensaje del servidor si existe, si no usar el message genérico
            setError(error.response?.data?.message || error.message);
            console.error("Axios GET error:", error);
        } finally {
            setLoading(false);
        }   
    };
    
    useEffect(() => {
        getProducts();
    }, []);
    
    // Crear un producto nuevo
    const createProduct = async (value) => {
        try {
            setLoading(true);
            // Usamos api.post para aprovechar el interceptor y la baseURL
            const response = await api.post(API_URL, value); 
            console.log("response createProduct", response.data);
            await getProducts(); // Actualiza la lista de productos después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            console.error("Axios POST error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Editar un producto existente
    const editProduct = async (values) => {
        if (!editingProduct) return; // Si no hay un producto en edición, no hacemos nada
        try {
            setLoading(true);
            // api.put en lugar de axios.put
            await api.put(`${API_URL}/${editingProduct.id}`, values);
            setEditingProduct(null); // Resetear el producto en edición
            await getProducts(); // Actualiza la lista de productos después de editar uno
        } catch (error) { 
            setError(error.response?.data?.message || error.message);
            console.error("Axios PUT error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Eliminar un producto
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            // api.delete en lugar de axios.delete
            await api.delete(`${API_URL}/${id}`);
            console.log("response deleteProduct", id);
            await getProducts(); // Actualiza la lista de productos luego de eliminar uno
            return true;
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            console.error("Axios DELETE error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider 
            value={{
                products, 
                getProducts, 
                createProduct, 
                loading, 
                setLoading, 
                editProduct, 
                error, 
                setError, 
                editingProduct, 
                setEditingProduct, 
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
