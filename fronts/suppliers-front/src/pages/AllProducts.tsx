import { Box, Grid, Text } from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import ProductOverview from "../components/ProductOverview";
import { Product } from "../utils/types";
import { getProducts } from "../CRUD/product";

const AllProducts = () => {
    const api = 'http://localhost:3500/api';
    const { keycloak } = useKeycloak();
    const [products, setProducts] = useState<Product[]>([]);

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
        <Box padding={1}>
            <Text mb={30} size={'xl'} textAlign={'start'}>
                Liste de vos produits
            </Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={20}>
                {products.map((product, index)=> {
                    return (<ProductOverview key={index} product={product}/>)
                })}
            </Grid>
        </Box>
    );
}

export default AllProducts;