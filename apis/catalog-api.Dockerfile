#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["apis/catalog-api/catalog-api.csproj", "catalog-api/"]
RUN dotnet restore "catalog-api/catalog-api.csproj"
COPY . .
WORKDIR "/src/catalog-api"
RUN dotnet build "catalog-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release --self-contained --runtime linux-x64 -o out

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "catalog-api.dll"]