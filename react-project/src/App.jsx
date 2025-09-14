import 'primereact/resources/themes/lara-dark-indigo/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';               // Estilos base
import 'primeicons/primeicons.css';
import './App.css';


import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import UsersModule from './users';

import { ProducProvider } from './context/ProductContext';
import ProductsModule from './products';

import { AuthProvider } from './context/AuthContext'
import AuthModule from './auth';

import PrivateRoute from './utils/PrivateRoute';

import ResetPassword from './auth/resetPassword';

import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import IndexModule from './home';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  
        <Fragment>

          <MenuBar />
          <IndexModule />

          <AuthModule />
      
          <ProducProvider>
            <ProductsModule />
          </ProducProvider>

          <UserProvider>
            <UsersModule />
          </UserProvider>

          <Footer />
        </Fragment>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
