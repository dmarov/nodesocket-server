# syntax=docker/dockerfile:1
# self hosted image is preferrable
FROM centos:centos7.9.2009
WORKDIR /server
ARG SERVER_PORT 80
RUN useradd -ms /bin/bash server &&\
 curl -sL https://rpm.nodesource.com/setup_16.x | bash - &&\
 yum install -y nodejs
USER server
EXPOSE ${SERVER_PORT}
