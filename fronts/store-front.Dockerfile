FROM node:16-alpine

WORKDIR /fronts/store-front

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD npm run dev