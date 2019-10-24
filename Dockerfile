FROM node:10.16

COPY . /api/

WORKDIR /api

RUN npm install
RUN npm run build

CMD node server.js