
# Docker Logger 
Application to display logs from dockers
## Getting started
1. ```git clone git@github.com:dmarczydlo/react-starter.git```
1. ```yarn install```
1. ```yarn dev```
1. install nginx
1. configure nginx like below: 
```shell
server {
                 listen localhost:9000;
                 location / {
                         add_header 'Access-Control-Allow-Origin' '*';
                         add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                         proxy_pass http://unix:/var/run/docker.sock:/;
                         }
                 }
         }
```
1. Add servers to config.json 
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
