FROM octohost/nodejs

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
