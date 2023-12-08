import { SmallCloseIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react"
import { getProductsLocalStorage, setProductsLocalStorage } from "../../utils"

import { Image as ImageIcon } from "react-feather"

type Props = {
    cartProduct: CartProduct
    setProducts: Function
}

export const CartItem = ({cartProduct, setProducts}: Props) => {

    const removeCartProduct = () => {
        const cartProducts = getProductsLocalStorage();

        const indexToRemove = cartProducts.findIndex(p => p.id === cartProduct.id)
        
        // cartProducts.filter(product => cartProduct.id != product.id);

        cartProducts.splice(indexToRemove, 1);
        
        setProductsLocalStorage(cartProducts);
        setProducts(cartProducts)
    }

    return (
        <Flex gap={10} marginY={5}justifyContent={"space-between"}>
            <Flex gap={10} marginY={5}>
                {
                    cartProduct.imagePath ? 
                    <Image src={cartProduct.imagePath } width={100} height={100} objectFit={"cover"}/>
                    :
                    <ImageIcon size={'100'} />
                }
                <Box>
                    <Heading size={"md"}>{cartProduct.name}</Heading>
                    {
                        cartProduct.discountPrice  ?
                        <>
                            <Text as="s" color={"brand.primary"} marginTop={2}>{cartProduct.price}€</Text>
                            <Text marginTop={2}>{cartProduct.discountPrice}€</Text>
                        </>
                        :
                        <Text marginTop={2}>{cartProduct.price}€</Text>
                    }
                </Box>
            </Flex>

            <IconButton marginY={"auto"} aria-label={"remove product"} icon={<SmallCloseIcon />} onClick={removeCartProduct}/>
        </Flex>
    )
}