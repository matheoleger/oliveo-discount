import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import { useKeycloak } from '@react-keycloak/web';
import { ReactNode } from 'react';
import ProfilePage from './pages/Profile';

const PrivateRoute = ({ children } : {children : ReactNode}) => {
    const { keycloak } = useKeycloak();
   
    const isLoggedIn = keycloak.authenticated;
   
    return isLoggedIn ? children : null;
   };

export function AppRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<PrivateRoute>
                <ProfilePage/>
            </PrivateRoute>} />
        </Routes>
    );
}
