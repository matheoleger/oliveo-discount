import Keycloak from "keycloak-js";

const keycloakClient = new Keycloak({
    url: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM as string,
    clientId: process.env.KEYCLOAK_CLIENT as string,
})

export default keycloakClient;