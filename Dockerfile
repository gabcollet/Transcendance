# syntax=docker/dockerfile:1

FROM node:18-alpine3.15

RUN apk add bash

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app
COPY . .

RUN bash -c 'while ! nc -z localhost 5432; do sleep 1; done;'
# RUN npm install 
RUN npx prisma migrate dev

CMD [ "npm", "run", "start:dev" ]