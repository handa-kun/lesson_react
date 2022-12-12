FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm i --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npm", "run", "start" ]