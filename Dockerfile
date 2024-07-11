FROM node:21

WORKDIR /src

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["npm", "start"]