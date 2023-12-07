import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";

const CategoryPage = () => {
    const { id } = useParams();

    const [currentCategory, setCurrentCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>([]);

    const getCategory = async () => {
        const categoryResp = await axios.get(`${process.env.CATALOG_API_URL}/Categories/${id}`);
        setCurrentCategory(categoryResp.data);
    }

    const getProducts = async () => {
        const productsResp = await axios.get(`${process.env.CATALOG_API_URL}/Products?categoryId=${id}`);
        setProducts(productsResp.data);
    }

    useEffect(() => {
        getCategory();
        getProducts();
    },[id])

    return (
        <Box padding={20}>
            <Heading as="h1" margin={"10px 0"}>{currentCategory?.name}</Heading>
            <Divider/>
            <Flex minHeight={"100vh"} alignItems={"start"} justifyContent={"center"} gap={10} padding={8} wrap={"wrap"}>
            {
                products.map((product) => (<ProductCard product={product}/>))
            }
            </Flex>
        </Box>
    )
}

export default CategoryPage;