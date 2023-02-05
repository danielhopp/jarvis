FROM node:18.14-alpine AS builder

ARG VITE_PRODUCT_TITLE=Jarvis
ARG VITE_API_ENDPOINT=/api

COPY ui /ui
RUN cd /ui && yarn && yarn build

FROM node:18.14-alpine

ENV API_BASE=/api
ENV WWW_DIR=/app/www

COPY api /app
RUN cd /app && yarn install --production=true
COPY --from=builder /ui/dist /app/www

WORKDIR /app
EXPOSE 80
COPY ./docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["-c"]
