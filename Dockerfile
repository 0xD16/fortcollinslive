FROM node:18 as builder

ENV TZ=America/Denver
WORKDIR /app
ADD package.json .
ADD yarn.lock .
RUN yarn install

ADD . .
RUN yarn build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
