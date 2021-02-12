# Step 1
FROM node:12 as build-step
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm clean-install
COPY ./ /app/
RUN npm run build

# Stage 3
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/.htpasswd /etc/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

