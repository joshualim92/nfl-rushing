FROM node:lts-alpine3.10 as builder
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:lts-alpine3.10
WORKDIR /home/node/app
COPY --from=builder /home/node/app/package.json .
COPY --from=builder /home/node/app/package-lock.json .
RUN npm ci --production
COPY --from=builder /home/node/app/build ./build
USER node
CMD [ "npm", "start" ]
