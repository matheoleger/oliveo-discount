import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

type Props = {
    carProduct: CartProduct
}

export const CartItem = ({carProduct}: Props) => {
    return (
        <Flex gap={10} marginY={5}>
            <Image src={carProduct.imagePath} width={100} height={100} objectFit={"cover"}/>
            <Box>
                <Heading size={"md"}>{carProduct.name}</Heading>
                {
                    carProduct.discountPrice  ?
                    <>
                        <Text as="s" color={"brand.secondary"} marginTop={2}>{carProduct.price}€</Text>
                        <Text color={"brand.secondary"} marginTop={2}>{carProduct.discountPrice}€</Text>
                    </>
                    :
                    <Text color={"brand.secondary"} marginTop={2}>{carProduct.price}€</Text>
                }
            </Box>
        </Flex>
    )
}