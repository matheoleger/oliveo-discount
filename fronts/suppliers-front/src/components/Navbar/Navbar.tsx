import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";

import { LogoWithText } from "../../assets/svg/LogoWithText";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <Box as="nav" width={"100vw"} backgroundColor="brand.dark">
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
            <Text color={'brand.light'} fontSize={'md'}>
                Plateforme Fournisseurs
            </Text>
            <MainElement/>
        </Flex>
        </Box>
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
        </Flex>
    )
}