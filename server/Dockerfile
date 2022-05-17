#!/bin/sh

FROM node:16

# create app directory
WORKDIR /usr/src/app

# up here so that don't reinstall dependencies when cahnging sources
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY wait-for-it.sh .

# COPY .env.production .env

ARG REDIS_HOST
ARG POSTGRES_HOST

RUN yarn build


ENV NODE_ENV production

EXPOSE 8080

CMD [ "node", "dist/index.js" ]

USER node
