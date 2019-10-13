#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo ""

if [ $# -gt 1 -a "$1" == "push" ]
then
    TAG=$2
    echo "# Pushing Web ($TAG)"
    echo ""
    docker push evoflare.docker:50000/web:$TAG
elif [ $# -gt 1 -a "$1" == "tag" ]
then
    TAG=$2
    echo "Tagging Web as '$TAG'"
    docker tag evoflare.docker:50000/web evoflare.docker:50000/web:$TAG
else
    echo "# Building Web"

    echo ""
    echo "Building app"
    echo "npm version $(npm --version)"
    # npm install
    # npm audit fix
    npm run build-docker
    # npm run build

    echo ""
    echo "Building docker image"
    docker --version
    docker build -t evoflare-web -f Dockerfile.web $DIR/.

    # TODO remove
    docker image tag evoflare-web evoflare.docker:50000/web
    docker push evoflare.docker:50000/web
    
    # docker hub
    docker tag evoflare.docker:50000/web evoflare/web
    docker push evoflare/web
fi
