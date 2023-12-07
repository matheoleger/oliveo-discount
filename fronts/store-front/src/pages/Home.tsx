import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard/ProductCard";

import christmasBanner from "../assets/img/christmas-banner.png"
import { Banner } from "../components/Banner";


type ProductsByCategories = {
  [category:string]: Product[]
}

const HomePage = () => {
  const [productsByCategories, setProductsByCategories] = useState<ProductsByCategories>();

  
  const getProducts = async () => {
    const productsResp = await axios.get(
      `${process.env.CATALOG_API_URL}/Products?getCategory=true`
    );

    const groupedProducts: any = {};

    for (const product of productsResp.data) {
      if (!groupedProducts[product.category.name]) {
        groupedProducts[product.category.name] = [];
      }
    
      groupedProducts[product.category.name].push(product);
    }

    setProductsByCategories(groupedProducts);
  };

  useEffect(() => {
    getProducts();
  },[]);

  return (
    <Box gap={20} padding={20}>
      <Banner imageSrc={christmasBanner} navigateRoute={"/categories/6c392d62-8743-4e9e-a78a-69264d8c934e"}/>
      { productsByCategories &&
        Object.keys(productsByCategories).map((productsByCategory) => {
          return (
            <>
              <Heading as="h1" marginTop={10}>
                { productsByCategory }
              </Heading>
              <Divider/>
              <Flex gap={10} marginY={10} wrap={"wrap"}>
                {
                  productsByCategories[productsByCategory].map((product) => <ProductCard product={product}/>)
                }              
              </Flex>
            </>
          )
        })
      }
    </Box>
  );
};

export default HomePage;
