FROM node:lts-alpine3.10 as builder
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:lts-alpine3.10
WORKDIR /home/node/app
RUN npm install -g serve
COPY --from=builder /home/node/app/build .
USER node
CMD ["serve", "-p", "3000"]
