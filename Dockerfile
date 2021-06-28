FROM node:15 AS build

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

#prepare nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g","daemon off;"]