FROM node:16-alpine

WORKDIR /fronts/sso-front

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD npm run dev