# Docker Logger 

Application to display logs from dockers

[![Greenkeeper badge](https://badges.greenkeeper.io/dmarczydlo/docker-logger.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/dmarczydlo/docker-logger/status.svg)](https://david-dm.org/dmarczydlo/docker-logger)
[![devDependencies Status](https://david-dm.org/dmarczydlo/docker-logger/dev-status.svg)](https://david-dm.org/dmarczydlo/docker-logger?type=dev)
[![Build Status](https://travis-ci.org/dmarczydlo/docker-logger.svg?branch=master)](https://travis-ci.org/dmarczydlo/docker-logger)
[![Known Vulnerabilities](https://snyk.io/test/github/dmarczydlo/docker-logger/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dmarczydlo/docker-logger?targetFile=package.json)

## Getting started
1. ```git clone git@github.com:dmarczydlo/react-starter.git```
1. ```yarn```
1. ```yarn start```

Then application should work correctly on ```3000``` port in developer mode.

For correct work Docker Logger you have to serve ```docker.sock``` as json file with ```CORS```. `Nginx` is one of the options for that.
### Internal Nginx
1. Install nginx on your system
1. Configure nginx like below: 
```shell
server {
         listen localhost:9000;
         location / {
                 add_header 'Access-Control-Allow-Origin' '*';
                 add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                 proxy_pass http://unix:/var/run/docker.sock:/;
                 }
         }
```
### Docker
If you do not want to install nginx please use dockers
*  ```docker-compose -f ./docker/docker-compose.yml up --build```

Project include 2 different dockers:
1. Nginx to serve `Docker Logger` on production mode. (port: `8081`)
1. Nginx to serve `docker.sock` 


### Adding servers
Current servers are defined in ```config.json```
Examples:
 
```json 
[
  {
    "NAME": "Server test1",
    "URL": "http://localhost:9000"
  },
  {
    "NAME": "Server test2",
    "URL": "http://localhost:9000"
  }
]
``` 
