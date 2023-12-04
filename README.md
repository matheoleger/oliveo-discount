# oliveo-discount
Monorepo for the school projet Oliveo Discount. 

## Docker

To run all containers :

```bash
docker compose up --build
```

> :bulb: For the APIs/Postgres, we need to do an update of migrations before starting to use APIs. Normally this is done automatically via code but just in case here is the command : 
```bash
dotnet ef update database
```

## Develop for API 

You can find the documentation in the appropriate folder.
