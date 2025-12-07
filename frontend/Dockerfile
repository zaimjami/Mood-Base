FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./ || true
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
