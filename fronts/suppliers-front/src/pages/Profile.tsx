import { Box} from "@chakra-ui/react";
import { useKeycloak } from "@react-keycloak/web";

const ProfilePage = () => {
  const {keycloak} = useKeycloak();
    
  return <Box padding={5}>Bonjour {keycloak.tokenParsed!.name}</Box>
};

export default ProfilePage;