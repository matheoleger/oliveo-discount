import { Box, Button, Card, Flex, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from "@chakra-ui/react"
import { Product } from "../utils/types";
import { Image as IconImage } from "react-feather";
import InfoNumberLine from "./InfoNumberLine";

const ProductOverview = ({product}: {product: Product}) => {
    return (
        <Card direction={'row'} gap={5} alignItems={'start'} backgroundColor={'white'} padding={5}>
          <Flex 
            width={250}
            height={250}
            alignItems={'center'}
            justifyContent={'center'}>
            {product.imagePath !=='' ? (
              <Image width={250} height={250} borderRadius={'10'} src={product.imagePath} objectFit={'cover'}></Image>
            ) : (
              <Box>
                <IconImage size={'150'} />
              </Box>
            )}
          </Flex>

          <Flex direction={'column'}>
            <Text fontSize={'2xl'} textAlign={'start'} fontWeight={'bold'}>{product.name}</Text>
            <Text fontSize={'md'} textAlign={'justify'} height={'100px'}>{product.description}</Text>
            <Flex direction={'row'} gap={10}>
              <InfoNumberLine entity="price" unit={product.discountPrice ? product.discountPrice! : product.price!} oldUnit={product.discountPrice && product.price}/>
              <InfoNumberLine entity="stock" unit={product.stock!}/>
            </Flex>
          </Flex>
        </Card>
    )
}

export default ProductOverview;