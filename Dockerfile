FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

ADD . /usr/src/app

RUN yarn build

CMD ["yarn", "start"]