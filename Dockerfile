# Use phusion/baseimage as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/baseimage-docker/blob/master/Changelog.md for
# a list of version numbers.
FROM phusion/baseimage:0.9.16

RUN apt-get update && apt-get -y install git build-essential  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -sL https://deb.nodesource.com/setup | sudo bash -

RUN apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*



RUN apt-get update

RUN apt-get -y install nginx make

RUN mkdir /srv/www

ADD default /etc/nginx/sites-available/default
ADD nginx.conf /etc/nginx/nginx.conf

WORKDIR /srv/www

ADD . /srv/www/

RUN export NODE_ENV=APP_ENV
RUN npm install

RUN apt-get update

RUN export DEBIAN_FRONTEND=noninteractive
RUN sudo apt-get -q -y install curl

RUN npm install -g n
RUN n 0.11.14

ADD start.sh /tmp/start.sh

RUN chmod +x /tmp/start.sh

EXPOSE 80

CMD /tmp/start.sh
