import { Box, Button, Text } from "@chakra-ui/react"
import { useNavigate, useNavigation } from "react-router-dom";

const NotAuthorized = () => {
    const navigate = useNavigate();
    // TODO : styliser cette page avec une image storyset
    return (
        <Box>
            <Text>
                Vous n'avez pas accès à cette page.
            </Text>
            <Button
            onClick={()=> navigate('/')}
            >
                Retourner à la page d'accueil
            </Button>
        </Box>
    )
}

export default NotAuthorized;