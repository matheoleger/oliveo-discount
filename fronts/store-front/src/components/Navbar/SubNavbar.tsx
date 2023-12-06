import { Flex, Link } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SubNavbar = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	const getCategory = async () => {
		try {
			const resp = await axios.get(`${process.env.CATALOG_API_URL}/Categories`);
			setCategories(resp.data);
		} catch(error: any) {
			console.error(error.code, error.message);
		}

	}

	useEffect(() => {
			getCategory();
	},[])

  const navigate = useNavigate();

  return (
    <Flex as="nav" w="100%" bgColor="brand.secondary" padding={"8px 0"}>
      {categories.map((category) => (
        <Link
        	onClick={() => navigate(`/categories/${category.id}`)}
          margin={"0 10px"}
          color="brand.dark"
          fontWeight={"bold"}
          _hover={{ textDecoration: "none", color: "black" }}
        >
          {category.name}
        </Link>
      ))}
    </Flex>
  );
};
