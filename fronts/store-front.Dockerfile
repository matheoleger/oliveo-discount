FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY /fronts/store-front/package*.json /app

RUN yarn install

COPY ./fronts/store-front /app

EXPOSE 3000

CMD ["yarn", "dev"]