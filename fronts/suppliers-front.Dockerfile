FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY /fronts/suppliers-front/package*.json /app

RUN yarn install

COPY ./fronts/suppliers-front /app

EXPOSE 3000

CMD ["yarn", "dev"]