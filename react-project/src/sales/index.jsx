import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";
import  {Routes, Route} from 'react-router-dom';

const ProductsModule = () => {
    return (
        
            <Routes>
                <Route path="/productos" element={<ProductsView />} />
                <Route path="/productos/crear" element={<ProductForm />} />
                <Route path="/productos/editar/:id" element={<ProductForm />} />
            </Routes>
    
    )
}

export default ProductsModule