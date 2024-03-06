FROM nginx:stable-alpine
COPY ./build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
COPY ./nginx/.htpasswd /usr/share/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

