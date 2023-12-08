import { Avatar, Box, Flex, IconButton, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ShoppingCart } from "react-feather";

import { LogoWithText } from "../../assets/svg/LogoWithText";
import { Searchbar } from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { Cart } from "../Cart/Cart";


export const MainNavbar = () => {

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Flex alignItems={"center"}>
                <Searchbar/>
                <Avatar name="Mathéo LEGER" margin={"0 20px"} bgColor="brand.secondary" _hover={{cursor: "pointer"}} title={"Votre compte"}/>
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