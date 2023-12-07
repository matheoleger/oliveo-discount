import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image as ImageComp,
  Input,
  Modal,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  theme,
  useDisclosure
}
 from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image as ImageIcon, Plus } from 'react-feather';
import { Category, Product } from '../utils/types';
import PreviewModalContent from '../components/PreviewModalContent';
import { useKeycloak } from '@react-keycloak/web';
import ModalSuccess from '../components/ModalSuccess';
import { useNavigate } from 'react-router-dom';


const api = 'http://localhost:3500/api';
const AddProduct = () => {
  // TODO : refactoriser cette page
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [isCreated, setCreated] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    imgLink: '',
    stock: 0,
    categoryId: '',
    description: '',
    price: 0.01,
  });
  const [errors, setErrors] = useState({
    name: false,
    imgLink: false,
    description: false,
  });

  

  const getCategories = async () => {
    const categoriesResp = await axios.get(`${api}/Categories`);
    setCategories(categoriesResp.data);
    setNewProduct({...newProduct, categoryId: categoriesResp.data[0].id})
  };

  useEffect(() => {
    getCategories();
  }, []);



  const handleClick = () => {
    const errorsFound = {
      name:false,
      description: false,
      imgLink: errors.imgLink,
    }

    if (newProduct.name.length < 1) {
      errorsFound.name = true;     
    }

    if (newProduct.description.length < 1) {
      errorsFound.description = true;
    }

    setErrors({...errors, ...errorsFound});

    if(!Object.values(errorsFound).includes(true)){
      onOpen();
    }

  };

  const checkImage = async (url: string) => {
    if(url === '') {
      setErrors({...errors, imgLink: false});
      return;
    }
    const newImage = new Image();
    newImage.src = url;
    console.log(errors);

    newImage.onload = () => {
      setErrors({...errors, imgLink: false});
      console.log(errors);
      return true;
    };

    newImage.onerror = () => {
      setErrors({...errors, imgLink: true});
    };
  };

  const parseStockNumber = (stock: string) => {
    if (stock == '') {
      return 0;
    }
    return Math.trunc(parseInt(stock));
  };

  const onValidate = async () => {
    const supplierId = keycloak.idTokenParsed?.sub;
    setNewProduct({...newProduct, supplierId});

    await axios.post(`${api}/Products`, newProduct).then((res)=> {
      if(res.status === 201){
        setCreated(true);
      }
    });
  }

  const resetForm = () => {
    setNewProduct({
      name: '',
      imgLink: '',
      stock: 0,
      categoryId: '',
      description: '',
      price: 0.01,
    }),
    onClose();
  }

  return (
    <Box padding={1}>
      <Text mb={30} size={'xl'} textAlign={'start'}>
        Ajouter un produit
      </Text>
      <Flex
        flexDirection={'row'}
        gap={10}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        <Flex
          w={'460px'}
          h={'460px'}
          backgroundColor={theme.colors.white}
          alignItems={'center'}
          justifyContent={'center'}
          padding={10}
          borderRadius={'20px'}
          boxShadow="0px 0px 25px 2px rgba(0, 0, 0, 0.10)"
        >
          <Box>
            {!errors.imgLink && newProduct.imgLink.length !== 0 ? (
              <ImageComp src={newProduct.imgLink} w={'xl'}></ImageComp>
            ) : (
              <ImageIcon size={'150'} />
            )}
          </Box>
        </Flex>
        <Flex flexDirection={'column'} width={'lg'} gap={5}>
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Nom du produit</FormLabel>
            <Input
              backgroundColor={theme.colors.white}
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            {errors.name && <FormHelperText textAlign={'start'} color={'red'}>Le nom est requis.</FormHelperText>}
          </FormControl>

          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              backgroundColor={theme.colors.white}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            ></Textarea>
            {errors.description && <FormHelperText textAlign={'start'} color={'red'}>La description est requis.</FormHelperText>}
          </FormControl>

          <FormControl isRequired isInvalid={errors.imgLink}>
            <FormLabel>Lien de l'image</FormLabel>
            <Input
              type="text"
              value={newProduct.imgLink}
              backgroundColor={theme.colors.white}
              onChange={(e) => {
                setNewProduct({ ...newProduct, imgLink: e.target.value });
                checkImage(e.target.value);
              }}
            />
            {errors.imgLink && <FormHelperText textAlign={'start'} color={'red'}>Le lien de l'image est incorrect.</FormHelperText>}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Catégorie du produit</FormLabel>
            <Select
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              backgroundColor={theme.colors.white}
            >
              {categories.length > 0 &&
                categories.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>

          <Flex gap={5}>
            <FormControl isRequired>
              <FormLabel>Prix</FormLabel>
              <NumberInput
                backgroundColor={theme.colors.white}
                defaultValue={newProduct.price}
                precision={2}
                min={0.01}
                step={0.5}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: parseFloat(e) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Stock disponible</FormLabel>
              <NumberInput
                backgroundColor={theme.colors.white}
                value={newProduct.stock}
                step={1}
                min={0}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: parseStockNumber(e) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

          <Button
            width={'xs'}
            mt={5}
            onClick={handleClick}
            backgroundColor={theme.colors.black}
            color={theme.colors.white}
            rightIcon={<Plus></Plus>}
          >
            Ajouter
          </Button>
        </Flex>
      </Flex>
      <Modal onClose={!isCreated ? onClose : () => navigate('/')} size={'xl'} isOpen={isOpen}>
        {!isCreated ? 
          <PreviewModalContent product={newProduct} onClose={onClose} onValidate={onValidate}/>
          :
          <ModalSuccess onClose={()=>navigate('/')} onReset={resetForm}/>
        }
      </Modal>
    </Box>
  );
};

export default AddProduct;
