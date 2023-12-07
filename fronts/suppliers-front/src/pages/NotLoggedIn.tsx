import { Box, Button, Text } from "@chakra-ui/react";
import { KeycloakInstance } from "keycloak-js";

const NotLoggedIn = (keycloak: KeycloakInstance) => {
    // TODO : styliser cette page avec une image storyset
    return (
        <Box>
            <Text>
                Vous n'êtes pas connecté. Merci de vous identifier pour pouvoir accéder à cette page.
            </Text>
            <Button
            onClick={()=> keycloak.login()}
            >
                Connexion
            </Button>
        </Box>
    )
}

export default NotLoggedIn;