import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsLocalStorage, setProductsLocalStorage } from "../utils";

const ProductViewPage = () => {
  const toast = useToast();
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();

  const getProduct = async () => {
    const categoryResp = await axios.get(
      `${process.env.CATALOG_API_URL}/Products/${id}?getCategory=true`
    );
    setProduct(categoryResp.data);
  };

  const addToCart = () => {
    const cartProducts = getProductsLocalStorage();

    if(!product)
      return;

    const cartProduct: CartProduct = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      imagePath: product?.imagePath
    }

    cartProducts.push(cartProduct);

    setProductsLocalStorage(cartProducts);

    toast({
      title: 'Produit ajouté.',
      description: "Le produit a bien été ajouté au panier.",
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Flex justifyContent={"center"} gap={10} padding={20} width={"100%"}>
      <Image
        src={
          product?.imagePath ||
          "https://singlecolorimage.com/get/d26255/250x250"
        }
        width={500}
        height={500}
        objectFit={"cover"}
        borderRadius={10}
      />
      <Box maxWidth={600}>
        <Text>{product?.category?.name}</Text>
        <Heading>{product?.name}</Heading>
        <Text>by {product?.supplierId}</Text>
        {/* <Heading marginY={5} color={"brand.secondary"}>
          {product?.price}€
        </Heading> */}
        <Flex gap={10}>
          {
            product?.discountPrice  ?
            <>
                <Heading marginY={5} as="s" color={"brand.primary"}>{product?.price}€</Heading>
                <Heading marginY={5}>{product?.discountPrice}€</Heading>
            </>
            :
            <Heading marginY={5} color={"brand.secondary"}>{product?.price}€</Heading>
          }
        </Flex>

        <Tabs variant="unstyled" minHeight={280} maxHeight={280} minWidth={600}>
          <TabList>
            <Tab {...TabStyle}>Description</Tab>
            <Tab {...TabStyle}>Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>{product?.description}</Text>
            </TabPanel>
            <TabPanel>
              <Text>
                Lorem ipsum do culpa officia aut! Impedit sit sunt quaerat,
                odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
                Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
                laudantium molestias eos sapiente officiis modi at sunt
                excepturi expedita sint? Sed quibusdam recusandae alias error
                harum maxime adipisci amet laborum.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex alignItems={"center"} gap={5}>
          <Button
            rightIcon={<AddIcon />}
            backgroundColor={"brand.dark"}
            color={"brand.light"}
            _hover={{color: "brand.primary"}}
            onClick={addToCart}
          >
            Ajouter au panier
          </Button>
          <Text
            color={
              product?.stock && product?.stock > 100
                ? "brand.secondary"
                : "brand.primary"
            }
          >
            {product?.stock && product?.stock > 100
              ? "En stock"
              : product?.stock != 0 ? `Plus que ${product?.stock} exemplaires` : "Rupture de stock"}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const TabStyle = {
  borderRadius: 0,
  borderX: "none",
  borderY: "none",
  borderBottom: "1px solid rgba(0,0,0,0)",
  _hover: {
    borderBottom: "1px solid",
    borderColor: "brand.primary",
    color: "brand.primary",
  },
  _selected: {
    borderBottom: "1px solid",
    borderColor: "brand.primary",
    color: "brand.primary",
  },
};

export default ProductViewPage;
