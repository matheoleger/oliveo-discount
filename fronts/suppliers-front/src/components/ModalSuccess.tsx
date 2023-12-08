import { Button, Flex, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from "@chakra-ui/react"
import { CheckCircle } from "react-feather";


const ModalSuccess = ({onClose, onReset, modified}: {onClose: Function, onReset: Function, modified: boolean}) => {
    return (
      <ModalContent>
        <ModalHeader>Ajout du produit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems={'center'} direction={'column'} gap={5}>
            <Text>Votre produit a bien été {modified ? 'modifié' : 'ajouté'}</Text>
            <CheckCircle color="green" size={'50'}></CheckCircle>
          </Flex>
        </ModalBody>
        <ModalFooter>
            <Button onClick={()=>onReset()}>Ajouter un nouveau produit</Button>
            <Button onClick={()=>onClose()} ml={5}>Revenir à la liste des produits</Button>
        </ModalFooter>
      </ModalContent>
    )
};

export default ModalSuccess;