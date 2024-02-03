FROM node:21.6-alpine3.18

WORKDIR /web

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]