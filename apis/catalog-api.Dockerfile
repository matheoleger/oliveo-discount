# Use the official .NET Core SDK as a parent image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copy the project file and restore any dependencies (use .csproj for the project name)
COPY apis/catalog-api/catalog-api.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY apis/catalog-api/ .

# Publish the application
RUN dotnet publish "catalog-api.csproj" -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose the port your application will run on
EXPOSE 80

# # Start the application
ENTRYPOINT ["dotnet", "catalog-api.dll"]


