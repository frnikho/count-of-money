FROM node:16.17.1-bullseye as base

RUN npm i -g nx serve pnpm

COPY package.json /app/
WORKDIR "/app"

RUN pnpm i

COPY . /app

FROM base as api
WORKDIR "/app/"
CMD pnpm run prod:api

FROM base as web
WORKDIR "/app/"
CMD pnpm run prod:web
