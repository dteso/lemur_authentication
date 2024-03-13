FROM node:19.2-alpine3.16

WORKDIR /app

COPY app.ts package.json tsconfig.json ./
COPY api ./api
COPY core ./core
COPY dal ./dal
COPY database ./database
COPY public ./public
COPY servers ./servers
COPY services ./services
COPY dist ./dist
COPY package.json ./dist

ARG APP_PORT
ARG DB_NAME
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG JWT_SECRET

ENV APP_PORT=$APP_PORT
ENV DB_NAME=$DB_NAME
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV JWT_SECRET=$JWT_SECRET

RUN npm install 

RUN npm install -g typescript

RUN tsc

EXPOSE 4410 ${APP_PORT}

CMD ["npm", "start"]

