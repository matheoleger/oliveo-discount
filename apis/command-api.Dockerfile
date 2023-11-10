#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["apis/command-api/command-api.csproj", "command-api/"]
RUN dotnet restore "command-api/command-api.csproj"
COPY . .
WORKDIR "/src/command-api"
RUN dotnet build "command-api.csproj" -c Release -o /app/build 

FROM build AS publish
RUN dotnet publish -c Release --self-contained --runtime linux-x64 -o out

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "command-api.dll"]