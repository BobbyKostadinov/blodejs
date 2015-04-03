## Build Status

[![Build Status](https://travis-ci.org/BobbyKostadinov/blodejs.svg?branch=master)](https://travis-ci.org/BobbyKostadinov/blodejs)

## Intro

Contains NODEjs + Nginx set up to run on AWS Elastic Beanstalk. I use this for my own projects' set up

## License

[MIT](/LICENSE)

## Docker instructions


Create a new Boot2Docker VM.

    $ boot2docker init

This creates a new virtual machine. You only need to run this command once.

Start the boot2docker VM.

    $ boot2docker start

Display the environment variables for the Docker client.

    $ boot2docker shellinit
    Writing /Users/mary/.boot2docker/certs/boot2docker-vm/ca.pem
    Writing /Users/mary/.boot2docker/certs/boot2docker-vm/cert.pem
    Writing /Users/mary/.boot2docker/certs/boot2docker-vm/key.pem
        export DOCKER_HOST=tcp://192.168.59.103:2376
        export DOCKER_CERT_PATH=/Users/mary/.boot2docker/certs/boot2docker-vm
        export DOCKER_TLS_VERIFY=1

The specific paths and address on your machine will be different.

To set the environment variables in your shell do the following:

    $ eval "$(boot2docker shellinit)"


display the ip of the VM:

    $ boot2docker ip

Display your running container with

    docker ps

Build a new container wiht

    docker build -t TAGHERE .

To start an image with command line and port mapping:

    docker run -d -p 80:80 TAGHERE /bin/bash
