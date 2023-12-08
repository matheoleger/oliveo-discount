import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { ShoppingCart } from "react-feather";

import { LogoWithText } from "../../assets/svg/LogoWithText";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";


export const MainNavbar = () => {
    

    const navigate = useNavigate();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            padding={"20px 70px"}
        >
            <Box _hover={{cursor: "pointer"}} onClick={() => navigate("/")}>
                <LogoWithText />
            </Box>
            <MainElement/>
        </Flex>
    )
}

const MainElement = () => {
    const { keycloak } = useKeycloak();
    console.log(keycloak.idTokenParsed);
    const [fullName, setFullName] = useState('');

    useEffect(()=> {
        if(keycloak.idTokenParsed) {
            const familyName = keycloak.idTokenParsed.family_name;
            const firstName = keycloak.idTokenParsed.given_name;
            setFullName(`${firstName} ${familyName}`);
        }
    },[keycloak.idTokenParsed])

    return (
        <Flex alignItems={"center"}>
            {!keycloak.authenticated ? (
                   <Button
                     onClick={() => keycloak.login()}
                   >
                     Connexion
                   </Button>
            ):
                   <Button
                     onClick={() => keycloak.logout()}
                   >
                     Déconnexion
                   </Button>
                 }
            {keycloak.authenticated && <Avatar name={fullName} margin={"0 20px"} bgColor="brand.secondary" _hover={{cursor: "pointer"}} title={"Votre compte"}/>}
            <IconButton colorScheme="none" aria-label="Show Cart" icon={<ShoppingCart width={30} height={30}/>} title={"Votre panier"} border="none"/>
        </Flex>
    )
}