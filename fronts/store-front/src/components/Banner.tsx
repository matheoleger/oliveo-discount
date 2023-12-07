import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
    imageSrc: string,
    navigateRoute: string
}

export const Banner = ({imageSrc, navigateRoute }: Props) => {

    const navigate = useNavigate();

    return (
        <Image src={imageSrc} backgroundColor={"brand.dark"} borderRadius={10} onClick={() => navigate(navigateRoute)}  _hover={{cursor: "pointer"}} margin={"auto"}/>
    )
}