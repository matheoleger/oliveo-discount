FROM node:18-alpine

WORKDIR /store-front

COPY /fronts/store-front/package*.json ./

RUN npm install

COPY /fronts/store-front .

EXPOSE 3000

CMD npm run dev