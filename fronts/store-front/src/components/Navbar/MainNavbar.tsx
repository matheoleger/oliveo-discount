import { Avatar, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { ShoppingCart } from "react-feather";

import { LogoWithText } from "../../assets/svg/LogoWithText";
import { Searchbar } from "./Searchbar";


export const MainNavbar = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            padding={"20px 70px"}
        >
            <LogoWithText/>
            <MainElement/>
        </Flex>
    )
}

const MainElement = () => {
    return (
        <Flex alignItems={"center"}>
            <Searchbar/>
            <Avatar name="Mathéo LEGER" margin={"0 20px"} bgColor="brand.secondary" _hover={{cursor: "pointer"}} title={"Votre compte"}/>
            <IconButton colorScheme="none" aria-label="Show Cart" icon={<ShoppingCart width={30} height={30}/>} title={"Votre panier"} border="none"/>
        </Flex>
    )
}