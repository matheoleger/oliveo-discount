FROM node:18-alpine

WORKDIR /sso-front

COPY /fronts/sso-front/package*.json ./

RUN npm install

COPY /fronts/sso-front .

EXPOSE 3000

CMD npm run dev