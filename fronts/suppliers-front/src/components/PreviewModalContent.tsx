import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from "@chakra-ui/react"
import { Product } from "../utils/types";
import ProductOverview from "./ProductOverview";

const PreviewModalContent = ({product, onClose, onValidate}: {product: Product, onClose: Function, onValidate: Function}) => {
    return (
      <ModalContent>
        <ModalHeader>Récapitulatif du produit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <ProductOverview product={product}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>onValidate()} backgroundColor={'brand.secondary'}>Valider</Button>
          <Button onClick={()=>onClose()} marginLeft={3} backgroundColor={'brand.primary'}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    )
};

export default PreviewModalContent;