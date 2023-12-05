import { Box, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
    const { id } = useParams();

    const [currentCategory, setCurrentCategory] = useState<Category>();

    const getCategory = async () => {
        const resp = await axios.get(`${process.env.CATALOG_API_URL}/Categories/${id}`);
        setCurrentCategory(resp.data);
    }

    useEffect(() => {
        getCategory();
    },[id])

    return (
        <Box>
            <Text>{currentCategory?.name}</Text>
            <Text>{currentCategory?.id}</Text>
        </Box>
    )
}

export default CategoryPage;