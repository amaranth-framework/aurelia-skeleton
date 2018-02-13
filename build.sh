#! /bin/sh

which docker \
&& ( docker rm -f aurelia-skeleton-builder || true ) \
&& docker run \
    --name aurelia-skeleton-builder \
    -v $(pwd):/aurelia \
    node \
    sh -c 'cd /aurelia && npm run build'