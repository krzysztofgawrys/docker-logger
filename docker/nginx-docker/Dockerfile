FROM nginx:latest

COPY docker.conf /etc/nginx/conf.d/docker.conf
EXPOSE 9000

RUN echo "daemon off;" >> /etc/nginx/docker.conf
