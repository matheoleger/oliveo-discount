import './App.css'
import { ChakraProvider} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import keycloakClient from './KeycloakClient';
import { ReactKeycloakProvider } from '@react-keycloak/web';

function App() {
  console.log(import.meta.env);
  const maVariable = import.meta.env.KEYCLOAK_CLIENT
  console.log(maVariable);
  console.log(process.env);
  // console.log(import.meta.env.KEYCLOAK_CLIENT)
  // console.log(import.meta.env.KEYCLOAK_REALM)
  // console.log(import.meta.env.KEYCLOAK_URL)
  
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
