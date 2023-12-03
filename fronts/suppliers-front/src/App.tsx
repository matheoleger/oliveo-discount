import './App.css'
import { ChakraProvider} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import keycloakClient from './KeycloakClient';
import { ReactKeycloakProvider } from '@react-keycloak/web';

function App() {
  
  return (
    <ChakraProvider>
      <ReactKeycloakProvider authClient={keycloakClient}>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
      </ReactKeycloakProvider>
    </ChakraProvider>
  )
}

export default App
