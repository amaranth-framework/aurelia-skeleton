#! /bin/sh

set -ex

docker rm -f aurelia-skeleton-nginx || true
docker run \
    --name aurelia-skeleton-nginx \
    -p 8080:80 \
    -v $(pwd)/dist:/usr/share/nginx/html:ro \
    -v $(pwd)/.nginx/default.conf:/etc/nginx/conf.d/default.conf:ro \
    nginx:latest