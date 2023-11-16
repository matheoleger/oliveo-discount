FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["apis/catalog-api/catalog-api.csproj", "catalog-api/"]
RUN dotnet restore "catalog-api/catalog-api.csproj"
COPY . .
WORKDIR "/src/catalog-api"
RUN dotnet build "catalog-api.csproj" -c Release -o /app/build

# Stage 2: Publish the application
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Create the runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# COPY --from=publish /usr/share/dotnet/shared/Microsoft.NETCore.App/7.0.0/ .
ENTRYPOINT ["dotnet","catalog-api.dll"]