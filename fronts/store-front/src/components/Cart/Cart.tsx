import { ModalBody, ModalCloseButton, ModalContent, ModalHeader, Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getProductsLocalStorage } from "../../utils";
import { CartItem } from "./CartItem";

export const Cart = ({isOpen}:{isOpen: boolean}) => {

    const [products, setProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        const cartProducts = getProductsLocalStorage();

        setProducts(cartProducts);
    },[isOpen])

    return (
        <ModalContent minWidth={600}>
            <ModalHeader>Votre panier</ModalHeader>
            <ModalCloseButton/>
            <ModalBody padding={10}>
                {
                    products &&
                    products.map(product => (
                        <>
                            <CartItem carProduct={product}/>
                            <Divider/>
                        </>
                    ))
                }            
            </ModalBody>

        </ModalContent>
    )
}