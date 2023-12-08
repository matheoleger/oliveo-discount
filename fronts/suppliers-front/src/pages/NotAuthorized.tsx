import { Button, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "../assets/svg/Unauthorized";

const NotAuthorized = () => {
    return (
        <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} marginTop={5} gap={5}>
            <Heading as={"h6"} fontSize={"lg"}>
                Vous n'avez pas les droits pour accéder à cette plateforme.
            </Heading>
            <Button
            onClick={()=> window.location.replace('http://localhost:3001')}
            >
                Retourner à la boutique OliveoDiscount
            </Button>
            <Unauthorized/>
        </Flex>
    )
}

export default NotAuthorized;