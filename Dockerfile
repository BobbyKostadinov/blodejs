# Use phusion/baseimage as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/baseimage-docker/blob/master/Changelog.md for
# a list of version numbers.
FROM phusion/baseimage:0.9.16

RUN apt-get update && apt-get -y install git build-essential curl

RUN apt-get install -yq nginx make

RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install -g n
RUN n 0.12.1


RUN mkdir /srv/www

ADD default /etc/nginx/sites-available/default
ADD nginx.conf /etc/nginx/nginx.conf

WORKDIR /srv/www


ADD start.sh /tmp/start.sh

RUN chmod +x /tmp/start.sh

#Extract this into its own Dockerfile within the application

ADD . /srv/www
RUN npm cache clean | npm install

RUN npm install -g gulp

RUN gulp build

EXPOSE 80

CMD /tmp/start.sh
