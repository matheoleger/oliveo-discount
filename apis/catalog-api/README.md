# Create new table + model

[Microsoft Documentation Tutorial](https://learn.microsoft.com/fr-fr/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code)

## Generate a controller

```bash
dotnet aspnet-codegenerator controller -name <NameController> -async -api -m <Name> -dc <ContextName> -outDir Controllers
```

# Add migration

```bash
dotnet ef migrations add InitialCreate

# :bulb: This command is already executed in the Dockerfile
dotnet ef database update
```