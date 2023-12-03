import { Box, Button, Text } from "@chakra-ui/react"
import { useKeycloak } from "@react-keycloak/web";

const HomePage = () => {
    const { keycloak } = useKeycloak();
    return (
        <Box>
            <Text>
                Bienvenue sur Oliveo Discount !
            </Text>
            {!keycloak.authenticated && (
                   <Button
                     onClick={() => keycloak.login()}
                   >
                     Login
                   </Button>
            )}
            {!!keycloak.authenticated && (
                   <Button
                     onClick={() => keycloak.logout()}
                   >
                     Logout ({keycloak.tokenParsed!.preferred_username})
                   </Button>
                 )}
        </Box>
    )
}

export default HomePage;