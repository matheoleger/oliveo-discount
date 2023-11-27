# oliveo-discount
Monorepo for the school projet Oliveo Discount. 

## Docker

To run all containers :

```bash
docker compose up --build
```

> :bulb: For the APIs/Postgres, we need to do an update of migrations before starting to use APIs :
```bash
dotnet ef update database
```
