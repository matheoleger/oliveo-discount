import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import { useKeycloak } from '@react-keycloak/web';
import { ReactNode } from 'react';
import ProfilePage from './pages/Profile';
import NotAuthorized from './pages/NotAuthorized';
import Loader from './components/Loader';
import AddProduct from './pages/AddProduct';
import NotLoggedIn from './pages/NotLoggedIn';
import AllProducts from './pages/AllProducts';

const PrivateRoute = ({ children } : {children : ReactNode}) => {
    const { keycloak } = useKeycloak();

    if(keycloak.authenticated === undefined){
        return Loader();
    }

    if(keycloak.authenticated != true) {
        return NotLoggedIn(keycloak);
    }     

    if(keycloak.hasRealmRole('supplier')) {
        return NotAuthorized();
    }

    return children;
};

export function AppRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<PrivateRoute>
                <ProfilePage/>
            </PrivateRoute>} />
            <Route path="/addproduct" element={<PrivateRoute>
                <AddProduct/>
            </PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute>
                <AllProducts/>
            </PrivateRoute>} />
        </Routes>
    );
}
