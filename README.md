#BlodeJS

Welcome to my playground! Blodejs is intended for my own learning and fun! Its a blogging platform build using Node and Koa, deployed on AWS using Travis and Beanstalk

This is using:
https://github.com/BobbyKostadinov/react-koa-isomorphic-starter



As I plan to use it to publish my own blog, soon enough you can read more about blodejs on my website http://its-a-kind-of-magic.com/


## Usage

Development:
`npm install`
`gulp dev`

Production:
`npm install`
`npm start --harmony`

(Notice the harmony flag. For current Node version. 0.12.0 this is still required to run EC6 generators that KOA needs)


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
