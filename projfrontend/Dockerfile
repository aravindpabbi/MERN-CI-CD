FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./projfronend

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000

CMD ["npm","start"]