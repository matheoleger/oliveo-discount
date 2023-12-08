import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Image as ImageComp,
  Input,
  Modal,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useDisclosure
}
 from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Plus } from 'react-feather';
import { Category, Product } from '../utils/types';
import PreviewModalContent from '../components/PreviewModalContent';
import { useKeycloak } from '@react-keycloak/web';
import ModalSuccess from '../components/ModalSuccess';
import { useNavigate } from 'react-router-dom';
import { addProduct, getCategories } from '../CRUD/product';


const AddProduct = () => {
  // TODO : refactoriser cette page
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const [isCreated, setCreated] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [displayDiscountPrice, setDisplayDiscountPrice] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    imagePath: '',
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

  

  const getAllCategories = async () => {
    const res = await getCategories();
    setCategories(res!.categories);
    setNewProduct({...newProduct, categoryId: res!.categories[0].id})
  };

  useEffect(() => {
    getAllCategories();
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
    const productToAdd = newProduct;
    productToAdd.supplierId = supplierId;
    await addProduct(productToAdd).then((res)=> {
      if(res && res.status === 201){
        setCreated(true);
      }
    });
  }

  const resetForm = () => {
    setCreated(false);
    setNewProduct({
      name: '',
      imagePath: '',
      stock: 0,
      categoryId: '',
      description: '',
      price: 0.01,
    }),
    onClose();
  }

  return (
    <Box padding={5}>
      <Flex gap={5}>
        <IconButton aria-label='Arrow-Left' onClick={()=> navigate('/products')} backgroundColor={'brand.secondary'}>
          <ArrowLeft/>
        </IconButton>
        <Heading mb={30} size={'xl'} textAlign={'start'}>
          Ajouter un produit
        </Heading>
      </Flex>
      
      <Flex
        flexDirection={'row'}
        gap={10}
        alignItems={'start'}
        justifyContent={'space-around'}
      >
        <Card
          width={'450px'}
          height={'450px'}
          backgroundColor={'white'}
          alignItems={'center'}
          justifyContent={'center'}
        >
            {!errors.imgLink && newProduct.imagePath.length !== 0 ? (
              <ImageComp src={newProduct.imagePath} w={'xl'} objectFit={'cover'} width={'460'} borderRadius={'var(--card-radius)'}
              height={'460'}></ImageComp>
            ) : (
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
              >
                <ImageIcon size={'150'} />
              </Flex>
            )}
        </Card>
        <Flex flexDirection={'column'} width={'lg'} gap={3}>
          <FormControl isRequired isInvalid={errors.name}>
            <FormLabel>Nom du produit</FormLabel>
            <Input
              backgroundColor={'white'}
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            {errors.name && <FormHelperText textAlign={'start'} color={'brand.primary'}>Le nom est requis.</FormHelperText>}
          </FormControl>

          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              backgroundColor={'white'}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            ></Textarea>
            {errors.description && <FormHelperText textAlign={'start'} color={'brand.primary'}>La description est requis.</FormHelperText>}
          </FormControl>

          <FormControl isInvalid={errors.imgLink}>
            <FormLabel>Lien de l'image</FormLabel>
            <Input
              type="text"
              value={newProduct.imagePath}
              backgroundColor={'white'}
              onChange={(e) => {
                setNewProduct({ ...newProduct, imagePath: e.target.value });
                checkImage(e.target.value);
              }}
            />
            {errors.imgLink && <FormHelperText textAlign={'start'} color={'brand.primary'}>Le lien de l'image est incorrect.</FormHelperText>}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Catégorie du produit</FormLabel>
            <Select
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              backgroundColor={'white'}
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
                backgroundColor={'white'}
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
                backgroundColor={'white'}
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
          <Flex alignItems={'end'} gap={'2'}>
          {displayDiscountPrice && <FormControl size={'10'}>
              <FormLabel>Prix soldé</FormLabel>
              <NumberInput
                backgroundColor={'white'}
                defaultValue={newProduct.discountPrice}
                precision={2}
                min={0.01}
                step={0.5}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, discountPrice: parseFloat(e) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>}

          <Button 
            backgroundColor={displayDiscountPrice ? 'brand.primary' : 'brand.secondary'}
            color={'brand.light'}
            onClick={()=>
              {
                displayDiscountPrice && setNewProduct({...newProduct, discountPrice: undefined})
                setDisplayDiscountPrice(!displayDiscountPrice);
              }
              }>{!displayDiscountPrice ? "Ajouter un prix soldé" : "Supprimer"}</Button>
            </Flex>

          <Button
            width={'xs'}
            onClick={handleClick}
            backgroundColor={'brand.dark'}
            color={'brand.light'}
            rightIcon={<Plus></Plus>}
          >
            Ajouter
          </Button>
        </Flex>
      </Flex>
      <Modal onClose={!isCreated ? onClose : () => navigate('/')} size={'xl'} isOpen={isOpen}>
        <ModalOverlay/>
        {!isCreated ? 
          <PreviewModalContent product={newProduct} onClose={onClose} onValidate={onValidate}/>
          :
          <ModalSuccess onClose={()=>navigate('/products')} onReset={resetForm}/>
        }
      </Modal>
    </Box>
  );
};

export default AddProduct;
