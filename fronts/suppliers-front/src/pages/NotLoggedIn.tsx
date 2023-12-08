import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { KeycloakInstance } from "keycloak-js";
import { Login } from "../assets/svg/Login";

const NotLoggedIn = (keycloak: KeycloakInstance) => {
    return (
        <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} marginTop={5} gap={5}>
            <Heading as={"h6"} fontSize={"lg"}>
                Vous n'êtes pas connecté. Merci de vous identifier pour pouvoir accéder à cette page.
            </Heading>
            <Flex gap={5}>
                   <Button
                     onClick={() => keycloak.login()}
                   >
                     Connexion
                   </Button>
                   <Button onClick={()=> window.location.replace('http://localhost:3001')}>
                    Aller à la boutique
                   </Button>
              </Flex>
            <Login/>
        </Flex>
    )
}

export default NotLoggedIn;