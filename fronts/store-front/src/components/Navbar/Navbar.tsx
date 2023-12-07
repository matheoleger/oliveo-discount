import { Box, theme } from "@chakra-ui/react";
import React from "react";
import { MainNavbar } from "./MainNavbar";
import { oliveoTheme } from "../../styles";
import { SubNavbar } from "./SubNavbar";

export const Navbar = () => {
    return (
        <Box as="nav" width={"100vw"} backgroundColor="brand.dark">
            <MainNavbar/>
            <SubNavbar/>
        </Box>
    )
}