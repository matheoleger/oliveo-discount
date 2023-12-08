import { Box, Button, Card, Flex, IconButton, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Tag, Text } from "@chakra-ui/react"
import { Product } from "../utils/types";
import { Edit, Image as IconImage, PenTool } from "react-feather";
import InfoNumberLine from "./InfoNumberLine";
import { useNavigate } from "react-router-dom";

const ProductOverview = ({product, modifyButton}: {product: Product, modifyButton?: boolean}) => {
    const navigate = useNavigate();
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
                <IconImage size={'150'} />
            )}
          </Flex>

          <Flex direction={'column'} width='50%'>
            <Flex direction={'row'} justifyContent={'space-between'}>
              <Flex direction={'column'}>
                <Text fontSize={'2xl'} textAlign={'start'} fontWeight={'bold'}>{product.name}</Text>
                <Box>
                  <Tag textAlign={'center'} backgroundColor={'brand.primary'} color={'brand.light'}>{product.category?.name}</Tag>
                </Box>
                <Text fontSize={'md'} textAlign={'justify'} height={'100px'}>{product.description}</Text>
              </Flex>
             {modifyButton && <IconButton aria-label="modify product" 
              backgroundColor={'brand.secondary'}
              color={'brand.light'}
              icon={<Edit/>}
              onClick={()=> navigate(`/addproduct/${product.id}`)}
              />}
            </Flex>
            <Flex direction={'row'} gap={10}>
              <InfoNumberLine entity="price" unit={product.discountPrice ? product.discountPrice! : product.price!} oldUnit={product.discountPrice && product.price}/>
              <InfoNumberLine entity="stock" unit={product.stock!}/>
            </Flex>
          </Flex>
        </Card>
    )
}

export default ProductOverview;