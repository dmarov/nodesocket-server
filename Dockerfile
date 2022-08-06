# syntax=docker/dockerfile:1
# self hosted image is preferrable
FROM centos:centos7.9.2009 AS base
WORKDIR /server
ARG SERVER_PORT=80
ENV SERVER_PORT=${SERVER_PORT}

RUN useradd -ms /bin/bash server &&\
 curl -sL https://rpm.nodesource.com/setup_16.x | bash - &&\
 yum install -y nodejs
EXPOSE ${SERVER_PORT}

FROM base AS image-local
USER server
CMD npm install &&\
 npm run dev

FROM base AS image-local-test
USER server
CMD npm install &&\
 npm run test:watch
