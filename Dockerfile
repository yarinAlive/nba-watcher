FROM node:10

ENV PROJECT_NAME=nba-watcher
RUN mkdir -p /root/${PROJECT_NAME}/
WORKDIR /root/${PROJECT_NAME}/

COPY ./app ./app
COPY ./package.json ./package.json
COPY ./.env ./.env

RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start" ]
