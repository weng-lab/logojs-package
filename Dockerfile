# intermediate base image
FROM node:10.16-alpine AS build

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN scripts/browserify.sh

# final base image
FROM nginx:alpine
COPY --from=build /usr/src/app/bundle.js /usr/share/nginx/html
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
