# Oliveo Discount
Monorepo for the school projet Oliveo Discount. 

## Run the Project

To run all containers:

```bash
docker compose up --build
```

Now, you need to add a Realms in the Keycloak container (if you want to go on fronts):

- Create a `docker-compose.override.yaml` file with this informations:
    ```yaml
        store-front:
            environment:
                - KEYCLOAK_URL=
                - KEYCLOAK_CLIENT=
                - KEYCLOAK_REALM=
                - CATALOG_API_URL=//localhost:3500/api

        suppliers-front:
            environment:
                - KEYCLOAK_URL=
                - KEYCLOAK_CLIENT=
                - KEYCLOAK_REALM=
                - CATALOG_API_URL=//localhost:3500/api
    ```
- Open keycloak at [localhost:8080](http://localhost:8080)
- 

## Develop API 

You can find the documentation in the appropriate folder (in a `README.md` file).

## Tips

If the project doesn't work well:
- Remove images like `Keycloak` or `Front` images.