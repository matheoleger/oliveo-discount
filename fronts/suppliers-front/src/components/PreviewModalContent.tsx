import { Box, Button, Flex, Image, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from "@chakra-ui/react"
import { Product } from "../utils/types";
import { Image as IconImage } from "react-feather";
import InfoNumberLine from "./InfoNumberLine";

const PreviewModalContent = ({product, onClose, onValidate}: {product: Product, onClose: Function, onValidate: Function}) => {
  // TODO : refacto + style de la carte
    return (
      <ModalContent>
        <ModalHeader>Récapitulatif du produit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          
          <Flex direction={'row'} gap={5} alignItems={'start'} justifyContent={'space-around'}>
              <Box>
                {product.imgLink ? (
                  <Image borderRadius={'10'} src={product.imgLink}></Image>
                ) : (
                  <Box borderRadius='10' backgroundColor={'red'}>
                    <IconImage size={'150'} />
                  </Box>
                )}
              </Box>

              <Flex direction={'column'}>
                <Text fontSize={'2xl'} fontWeight={'bold'}>{product.name}</Text>
                <Text fontSize={'md'} textAlign={'justify'}>{product.description}</Text>
                <Flex direction={'row'} justifyContent={'space-between'}>
                  <InfoNumberLine entity="price" unit={product.price!}/>
                  <InfoNumberLine entity="stock" unit={product.stock!}/>
                </Flex>
              </Flex>
          
          </Flex>

        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>onValidate()}>Valider</Button>
          <Button onClick={()=>onClose()}>Close</Button>
        </ModalFooter>
      </ModalContent>
    )
};

export default PreviewModalContent;