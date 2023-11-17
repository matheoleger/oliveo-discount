FROM node:18-alpine

WORKDIR /suppliers-front

COPY /fronts/suppliers-front/package*.json ./

RUN npm install

COPY /fronts/suppliers-front .

EXPOSE 3000

CMD npm run dev