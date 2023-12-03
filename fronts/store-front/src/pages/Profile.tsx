import { Box} from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/web";

const ProfilePage = () => {
  const {keycloak} = useKeycloak();
    
  return <Box>Bonjour {keycloak.tokenParsed!.name}</Box>
};

export default ProfilePage;