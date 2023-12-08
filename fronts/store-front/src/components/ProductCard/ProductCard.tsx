import { Box, Divider, Image, Text } from "@chakra-ui/react";
import { Rating } from "./Rating";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({product}:{product: Product}) => {

    const navigate = useNavigate();

    return (
        <Box onClick={() => navigate(`/products/${product.id}`)} backgroundColor={"white"} borderRadius={10} border={"1px solid #e1e1e1"} boxShadow='xl' padding={5} minWidth={330} maxWidth={330} maxHeight={470} _hover={{boxShadow:'2xl', cursor: "pointer"}}>
            <Image src={product.imagePath || "https://singlecolorimage.com/get/d26255/250x250"} height={250} width={250} objectFit={"cover"} borderRadius={10} margin={"auto"}/>
            <Box>
                <Text fontSize={22} margin={"20px 0 0 0"} noOfLines={2}>{product.name}</Text>
                <Rating rating={product.rating}/>
                <Divider margin={"15px 0"}/>
                {
                    product.discountPrice ?
                    <>
                        <Text as="s" color={"brand.primary"} fontSize={36}>{product.price}€</Text>
                        <Text fontSize={36}>{product.discountPrice}€</Text>
                    </>
                    :
                    <Text fontSize={36}>{product.price}€</Text>
                }
            </Box>
        </Box>
    )
}