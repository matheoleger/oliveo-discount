import { Button, Flex, Heading } from "@chakra-ui/react"
import { useKeycloak } from "@react-keycloak/web";
import { Supplier } from "../assets/svg/Supplier";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();
    return (
      <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} marginTop={5} gap={5}>
        <Heading as={"h6"} fontSize={"lg"}>
          Bienvenue sur OliveoDiscount - Plateforme Fournisseurs
        </Heading>
        {!keycloak.authenticated ? (
            <Flex gap={5}>
                   <Button
                     onClick={() => keycloak.login()}
                   >
                     Connexion
                   </Button>
                   <Button onClick={()=> window.open('http://localhost:3001', '_blank')}>
                    Aller à la boutique
                   </Button>
              </Flex>
            ):
            <Flex gap={5}>
              <Button
                onClick={() => keycloak.logout()}
                backgroundColor={'brand.primary'}
              >
                Déconnexion
              </Button>
              <Button
              backgroundColor={'brand.secondary'}
              onClick={() => navigate('products') }
            >
              Voir mes produits
            </Button>
            </Flex>
          }
        <Supplier/>
      </Flex>
        
    )
}

export default HomePage;