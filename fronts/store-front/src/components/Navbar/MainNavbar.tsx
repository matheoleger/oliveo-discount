import { Avatar, Box, Button, Flex, IconButton, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "react-feather";
import { SearchIcon } from '@chakra-ui/icons';
import { LogoWithText } from "../../assets/svg/LogoWithText";
import { Searchbar } from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { Cart } from "../Cart/Cart";
import { useKeycloak } from "@react-keycloak/web";


export const MainNavbar = () => {

    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [fullName, setFullName] = useState('');

    useEffect(()=> {
        if(keycloak.idTokenParsed) {
            const familyName = keycloak.idTokenParsed.family_name;
            const firstName = keycloak.idTokenParsed.given_name;
            setFullName(`${firstName} ${familyName}`);
        }
    },[keycloak.idTokenParsed])

    return (
        <>
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
            <Flex alignItems={"center"} gap={5}>
                {keycloak.hasRealmRole('supplier') === true && 
                (
                    <>
                    <IconButton colorScheme="none" aria-label="Search" icon={
                        <SearchIcon width={30} height={30}/>} title={"Votre panier"} border="none"/>
                    <Button
                        onClick={() => window.open('http://localhost:3000', "_blank")}
                    >
                        Portail Fournisseurs
                    </Button>
                    </>
                    )}
                {keycloak.authenticated && <Button
                    onClick={() => keycloak.logout()}
                >
                    Déconnexion
                </Button>}
                <Avatar name={fullName} margin={"0 20px"} bgColor="brand.secondary" _hover={{cursor: "pointer"}} title={"Votre compte"} onClick={()=> !keycloak.authenticated ? keycloak.login() : {}}/>
                <IconButton onClick={onOpen} colorScheme="none" aria-label="Show Cart" icon={<ShoppingCart width={30} height={30}/>} title={"Votre panier"} border="none"/>
            </Flex>

        </Flex>      
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <Cart isOpen/>
        </Modal>
        </>

    )
}