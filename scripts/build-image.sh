#!/bin/bash
# Builds docker container and tags it. Takes 1 arg:
# arg1: docker image tag (Optional)
# Example usage: scripts/build.sh v1.0.0
set -e

# cd to project root directory
cd "$(dirname "$(dirname "$0")")"

# Set docker tag to first arg or latest if arg not given.
[[ ! -z "$1" ]] && DOCKER_TAG="$1" || DOCKER_TAG=latest

# import common stuff
source scripts/lib/common.sh

# build the image and tag it with the project version
docker build -t gcr.io/${GCR_PROJECT_ID}/${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
