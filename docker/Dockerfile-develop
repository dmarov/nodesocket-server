# syntax=docker/dockerfile:1
# self hosted image is preferrable
FROM centos:centos7.9.2009
WORKDIR /server
RUN useradd -ms /bin/bash server &&\
 curl -sL https://rpm.nodesource.com/setup_16.x | bash - &&\
 yum install -y nodejs
USER server
EXPOSE 4000
