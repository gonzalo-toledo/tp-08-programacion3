// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// //creacion del context:
// export const SaleContext = createContext() // al context lo voy a importar en salesContainer.jsx


// // el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// // al provider lo voy a importar en App.jsx
// //children es lo que se va a renderizar dentro del provider, es una palabra reservada
// export const ProducProvider = ({ children }) => {
//     const[sales, setSales]= useState([]); 
//     const [editingSale, setEditingSale] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);


//     const API_URL = 'http://localhost:3000/ventas';

//     const getSales = async () => {   
//         try {
//             setLoading(true);
//             const response = await axios.get(API_URL);
//             setSales(response.data.data);
//             console.log("response getSales", response.data.data); //axios me devuelve los datos en .data
//         }catch (error) {
//             setError(error.message);
//             console.error("axios GET error:", error);
//         } finally {
//             setLoading(false);
//         }   
//     }
    
//     useEffect(() => {
//         getSales()
//     }
//     , [])
    
//     //crear un saleo
//     const createSale = async (value) => {
//         try {
//             setLoading(true);
//             const response = await axios.post(API_URL, value); 
//             console.log("response createSale", response.data);
//             await getSales(); // Actualiza la lista de saleos después de crear uno nuevo
//             return true;
//         } catch (error) {
//             setError(error.message);
//             console.error("Axios POST error:", error);
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // editar un saleo
//     const editSale = async (values) => {
//         if(!editingSale) return; // Si no hay un saleo en edición, no hacemos nada
//         try {
//             setLoading(true);
//             await axios.put(`${API_URL}/${editingSale.id}`, values);
//             setEditingSale(null); // Resetear el saleo en edición
//             await getSales(); // Actualiza la lista de saleos después de editar uno
//         } catch (error) { 
//             setError(error.message);
//             console.error("Axios PUT error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     // eliminar un saleo
//     const deleteSale = async (id) => {
//         try {
//             setLoading(true);
//             await axios.delete(`${API_URL}/${id}`);
//             console.log("response deleteSale", id);
//             await getSales(); // Actualiza la lista de saleos luego de eliminar uno
//             return true;
//         } catch (error) {
//             setError(error.message);
//             console.error("Axios DELETE error:", error);
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <SaleContext.Provider 
//             value={{
//                 sales, 
//                 getSales, 
//                 createSale, 
//                 loading, 
//                 setLoading, 
//                 editSale, 
//                 error, 
//                 setError, 
//                 editingSale, 
//                 setEditingSale, 
//                 deleteSale
//             }}
//         >
//             {children}
//         </SaleContext.Provider>
//     );
// }