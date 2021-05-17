FROM node:10
EXPOSE 3000
WORKDIR /usr
RUN mkdir uploads
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm i -g @nestjs/cli
ENTRYPOINT [ "nest","start" ]
