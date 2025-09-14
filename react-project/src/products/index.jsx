import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";
import  {Routes, Route} from 'react-router-dom';
import PrivateRoute from "../utils/PrivateRoute";

const ProductsModule = () => {
    return (
        
            <Routes>
                <Route 
                    path="/productos" 
                    element={
                        <PrivateRoute>
                            <ProductsView/>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/productos/crear" 
                    element={
                        <PrivateRoute>
                            <ProductForm/>
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/productos/editar/:id" 
                    element={
                        <PrivateRoute>
                            <ProductForm />
                        </PrivateRoute>
                    } 
                />
            </Routes>
    
    )
}

export default ProductsModule