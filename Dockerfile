FROM node:10.16-alpine

COPY . /api/

WORKDIR /api

RUN npm install
RUN npm run build

CMD node src/server.js
