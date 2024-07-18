FROM node:alpine

COPY . /app

WORKDIR /app

RUN npm install --legacy-peer-deps

CMD npm run start:dev