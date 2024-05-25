FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./

RUN npm install -g serverless
RUN yarn install

COPY . .

EXPOSE 4000
CMD [ "serverless", "offline", "start", "--httpPort=4000", "--host", "0.0.0.0", "--reloadHandler"]