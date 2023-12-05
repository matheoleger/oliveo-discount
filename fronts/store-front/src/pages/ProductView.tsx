import { Box, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

const ProductViewPage = () => {
    const { id } = useParams();
    
    return (
        <Box>
            <Text>Product</Text>
        </Box>
    )
}

export default ProductViewPage;