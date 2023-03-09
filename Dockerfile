FROM node:16-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build
ENTRYPOINT npm run migrate && npm run seed && npm run start
