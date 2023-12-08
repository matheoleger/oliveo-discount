import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import ProductOverview from "../components/ProductOverview";
import { Product } from "../utils/types";
import { getProducts } from "../CRUD/product";
import { useNavigate } from "react-router-dom";
import { Plus } from "react-feather";

const AllProducts = () => {
    const { keycloak } = useKeycloak();
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
 
    const getAllProducts = async (id:string) => {
        const productsResp = await getProducts(id);
        setProducts(productsResp!.products);
    }

    useEffect(()=> {
        if(keycloak.idTokenParsed && keycloak.idTokenParsed.sub) {
            getAllProducts(keycloak.idTokenParsed.sub);
        }
    },[keycloak]);

    return (
        <Box padding={5}>
            <Flex gap={10}>
                <Heading mb={30} size={'xl'} textAlign={'start'}>
                    Liste de vos produits
                </Heading>
                <Button backgroundColor={'brand.secondary'} onClick={()=> navigate('/addproduct')} rightIcon={<Plus/>}>
                    Ajouter un produit
                </Button>
            </Flex>
            <Grid templateColumns='repeat(2, 1fr)' gap={20}>
                {products.map((product, index)=> {
                    return (<ProductOverview key={index} product={product}/>)
                })}
            </Grid>
        </Box>
    );
}

export default AllProducts;