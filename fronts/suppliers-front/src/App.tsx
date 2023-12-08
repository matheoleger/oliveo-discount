import './App.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import keycloakClient from "./KeycloakClient";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { Navbar } from "./components/Navbar/Navbar";
import { oliveoTheme } from "./styles";

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'

function App() {
  
  const theme = extendTheme(oliveoTheme)

  return (
    <ChakraProvider theme={theme}>
    <ReactKeycloakProvider authClient={keycloakClient}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes/>
      </BrowserRouter>
    </ReactKeycloakProvider>
    </ChakraProvider>
  )
}

export default App
